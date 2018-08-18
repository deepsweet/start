import plugin from '@start/plugin/src/'
import optionsToArgs from './optionsToArgs'

export type Options = {
  [key: string]: boolean | string | string[]
}

export default (outDirRelative: string, userOptions?: Options) =>
  plugin('typescriptGenerate', async ({ files, logFile }) => {
    const path = await import('path')
    const { default: execa } = await import('execa')
    const { default: movePath } = await import('move-path')

    const tscBinPath = path.resolve('node_modules/.bin/tsc')
    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }

    return {
      files: await Promise.all(
        files.map(async (file) => {
          const outDir = path.dirname(movePath(file.path, outDirRelative))
          const options: Options = {
            allowSyntheticDefaultImports: true,
            lib: 'esnext',
            moduleResolution: 'node',
            ...userOptions,
            declarationDir: outDir,
            emitDeclarationOnly: true,
            declaration: true
          }
          const tscArgs = optionsToArgs(options)

          await execa(tscBinPath, [...tscArgs, file.path], spawnOptions)

          const dtsFilename = `${path.basename(file.path, '.ts')}.d.ts`
          const dtsPath = path.resolve(outDir, dtsFilename)

          logFile(dtsPath)

          return {
            path: dtsPath,
            data: null,
            map: null
          }
        })
      )
    }
  })
