import { StartPlugin } from '@start/sequence'

export default (outDirRelative: string, tscArgs: string[]) => {
  const typescriptGenerate: StartPlugin = async ({ input, logPath }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    const outDir = path.resolve(outDirRelative)
    const tscBinPath = path.resolve('node_modules/.bin/tsc')

    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
    }

    return Promise.all(
      input.map((file) =>
        execa(
          tscBinPath,
          [
            '--emitDeclarationOnly',
            '--declaration',
            '--declarationDir',
            outDirRelative,
            ...tscArgs,
            file.path,
          ],
          spawnOptions
        ).then(() => {
          logPath(path.resolve(outDir, `${path.basename(file.path, '.ts')}.d.ts`))

          return file
        })
      )
    )
  }

  return typescriptGenerate
}
