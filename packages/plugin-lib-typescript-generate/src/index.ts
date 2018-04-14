import plugin from '@start/plugin/src/'

export default (outDir: string, tscArgs: string[] = []) =>
  plugin('typescriptGenerate', async ({ files, logFile }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    const tscBinPath = path.resolve('node_modules/.bin/tsc')

    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }

    return Promise.all(
      files.map((file) =>
        execa(
          tscBinPath,
          [
            '--emitDeclarationOnly',
            '--declaration',
            '--declarationDir',
            outDir,
            ...tscArgs,
            file.path
          ],
          spawnOptions
        ).then(() => {
          const dtsFile = path.resolve(outDir, `${path.basename(file.path, '.ts')}.d.ts`)
          logFile(dtsFile)

          return {
            path: dtsFile,
            data: null,
            map: null
          }
        })
      )
    )
  })
