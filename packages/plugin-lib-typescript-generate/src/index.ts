import plugin from '@start/plugin/src/'

export type Options = {
  [key: string]: any
}
type WriteFile = (path: string, data: string, options: string, cb: (err: any) => void) => void

export default (outDirRelative: string, userOptions?: Options) =>
  plugin('typescriptGenerate', async ({ files, logFile }) => {
    const path = await import('path')
    const gracefulFs = await import('graceful-fs')
    const { default: makethen } = await import('makethen')
    const { default: execa } = await import('execa')
    const { default: dleet } = await import('dleet')

    const pWriteFile = makethen(gracefulFs.writeFile as WriteFile)
    const tscBinPath = path.resolve('node_modules/.bin/tsc')
    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }
    const rootConfigPath = path.resolve('tsconfig.json')

    return {
      files: await Promise.all(
        files.map(async (file) => {
          const outDir = path.resolve(outDirRelative)
          const tempConfig = {
            extends: rootConfigPath,
            compilerOptions: {
              ...userOptions,
              noEmit: false,
              emitDeclarationOnly: true,
              declaration: true,
              declarationDir: outDir
            },
            // overwrite possible ones from the root config
            include: [file.path],
            files: [file.path]
          }

          // 🙈 https://github.com/Microsoft/TypeScript/issues/12958
          const tempConfigPath = path.join(
            path.dirname(file.path),
            `.${path.basename(file.path)}.tsconfig.json`
          )

          await pWriteFile(tempConfigPath, JSON.stringify(tempConfig), 'utf8')

          try {
            await execa(tscBinPath, ['--project', tempConfigPath], spawnOptions)
          } finally {
            await dleet(tempConfigPath)
          }

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
