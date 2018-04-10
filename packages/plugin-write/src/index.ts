import plugin from '@start/plugin/src/'

export default (outDirRoot: string) =>
  plugin('write', async ({ files, logFile }) => {
    const { default: path } = await import('path')
    const { default: makethen } = await import('makethen')
    const { default: gracefulFs } = await import('graceful-fs')
    const { default: makeDirP } = await import('mkdirp')
    const makeDir = makethen(makeDirP)
    const writeFile = makethen(gracefulFs.writeFile)

    return Promise.all(
      files.map((file) => {
      // file.path = packages/beep/src/boop/index.js
      // outDir = packages/beep/build

      // packages/beep/src/boop/index.js -> index.js
        const inFile = path.basename(file.path)
        // packages/beep/src/boop/index.js -> packages/beep/src/boop
        const inDir = path.dirname(file.path)
        const inDirSplit = inDir.split(path.sep)
        const outDirSplit = outDirRoot.split(path.sep)
        const inDirUnique = inDirSplit
        // [ 'packages', 'beep', 'src', 'boop ] -> [ 'src', 'boop' ]
          .filter((segment, index) => segment !== outDirSplit[index])
        // [ 'src', 'boop' ] -> [ 'boop' ]
          .slice(1)
        // [ 'boop' ] -> 'boop'
          .join(path.sep)
        // packages/beep/build + boop -> packages/beep/build/boop
        const outDir = path.join(outDirRoot, inDirUnique)
        // packages/beep/build/boop + index.js ->  packages/beep/build/boop/index.js
        const outFile = path.join(outDir, inFile)

        return makeDir(outDir)
          .then(() => {
            const writeFiles = []
            let fileData = file.data || ''

            // sourcemap
            if (file.map != null) {
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
                writeFile(sourcemapPath, sourcemapData, 'utf8').then(() => {
                  logFile(sourcemapPath)
                })
              )
            }

            writeFiles.push(
              writeFile(outFile, fileData, 'utf8').then(() => {
                logFile(outFile)
              })
            )

            return Promise.all(writeFiles)
          })
          .then(() => ({
            ...file,
            path: outFile
          }))
      })
    )
  })
