import { StartPlugin } from '@start/sequence'

const overwrite: StartPlugin = async ({ input, logPath }) => {
  const { default: path } = await import('path')
  const { default: makethen } = await import('makethen')
  const { default: gracefulFs } = await import('graceful-fs')
  const writeFile = makethen(gracefulFs.writeFile)

  return Promise.all(
    input.map((file) => {
      // file.path = /Users/foo/test/packages/beep/src/boop/index.js
      const writeFiles = []
      let fileData = file.data || ''

      // sourcemap
      if (file.map != null) {
        // /Users/foo/test/packages/beep/src/boop/index.js -> /Users/foo/test/packages/beep/src/boop/
        const inDir = path.dirname(file.path)
        // /Users/foo/test/packages/beep/src/boop/index.js -> index.js
        const inFile = path.basename(file.path)
        // /beep/boop/src/beep/index.js -> .js
        const inExtname = path.extname(file.path)
        // index.js -> index.js.map
        const sourcemapFile = inFile + '.map'
        // /beep/boop/build/beep/index.js -> /beep/boop/build/beep/index.js.map
        const sourcemapPath = path.join(inDir, sourcemapFile)
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
            logPath(sourcemapPath)
          })
        )
      }

      writeFiles.push(
        writeFile(file.path, fileData, 'utf8').then(() => {
          logPath(file.path)
        })
      )

      return Promise.all(writeFiles)
    })
  ).then(() => input)
}

export default overwrite
