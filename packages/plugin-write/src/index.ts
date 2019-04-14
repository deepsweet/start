import plugin, { StartDataFilesProps, StartDataFile } from '@start/plugin/src/'

export default (outDirRelative: string) =>
  plugin('write', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
    const path = await import('path')
    const { promisify } = await import('util')
    const { writeFile } = await import('graceful-fs')
    const { default: movePath } = await import('move-path')
    const { default: makeDir } = await import('make-dir')

    const pWriteFile = promisify(writeFile)

    return {
      files: await Promise.all(
        files.map(async (file): Promise<StartDataFile> => {
          const outFile = movePath(file.path, outDirRelative)
          const outDir = path.dirname(outFile)

          await makeDir(outDir)

          const writeFiles = []
          let fileData = file.data

          // sourcemap
          if (file.map != null) {
            const inFile = path.basename(file.path)
            // /beep/boop/src/beep/index.js -> .js
            const inExtname = path.extname(file.path)
            // index.js -> index.js.map
            const sourcemapFile = inFile + '.map'
            // /beep/boop/build/beep/index.js -> /beep/boop/build/beep/index.js.map
            const sourcemapPath = path.join(outDir, sourcemapFile)
            const sourcemapData = JSON.stringify(file.map)

            // /*# sourceMappingURL=index.css.map */
            if (inExtname === '.css') {
              fileData += '\n/*# sourceMappingURL='
              fileData += sourcemapFile
              fileData += ' */'
              // //# sourceMappingURL=index.js.map
            } else {
              fileData += '\n//# sourceMappingURL='
              fileData += sourcemapFile
            }

            writeFiles.push(
              pWriteFile(sourcemapPath, sourcemapData, 'utf8').then(() => {
                logPath(sourcemapPath)
              })
            )
          }

          writeFiles.push(
            pWriteFile(outFile, fileData, 'utf8').then(() => {
              logPath(outFile)
            })
          )

          await Promise.all(writeFiles)

          return {
            ...file,
            path: outFile
          }
        })
      )
    }
  })
