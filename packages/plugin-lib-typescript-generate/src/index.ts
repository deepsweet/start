import { StartPlugin } from '@start/plugin-sequence'

export default (outDir: string, tscArgs: string[] = []) => {
  const typescriptGenerate: StartPlugin = async ({ input, logMessage }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

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
            outDir,
            ...tscArgs,
            file.path,
          ],
          spawnOptions
        ).then(() => {
          logMessage(path.join(outDir, `${path.basename(file.path, '.ts')}.d.ts`))

          return file
        })
      )
    )
  }

  return typescriptGenerate
}
