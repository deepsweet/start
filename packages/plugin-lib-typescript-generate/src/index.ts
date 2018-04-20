import plugin from '@start/plugin/src/'

export type Options = {
  [key: string]: boolean | string | string[]
}

export default (outDir: string, userOptions?: Options) =>
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
    const options: Options = {
      allowSyntheticDefaultImports: true,
      lib: 'esnext',
      ...userOptions,
      declarationDir: outDir,
      emitDeclarationOnly: true,
      declaration: true
    }
    const tscArgs = Object.keys(options).reduce((result, key) => {
      const value = options[key]

      if (typeof value === 'boolean') {
        return result.concat(`--${key}`)
      }

      if (typeof value === 'string') {
        return result.concat(`--${key}`, `${value}`)
      }

      if (Array.isArray(value)) {
        return result.concat(`--${key}`, `${value.join(',')}`)
      }

      return result
    }, [])

    return Promise.all(
      files.map((file) =>
        execa(
          tscBinPath,
          [
            ...tscArgs,
            file.path
          ],
          spawnOptions
        ).then(() => {
          const dtsFile = `${path.basename(file.path, '.ts')}.d.ts`
          const dtsPath = path.resolve(outDir, dtsFile)

          logFile(dtsPath)

          return {
            path: dtsPath,
            data: null,
            map: null
          }
        })
      )
    )
  })
