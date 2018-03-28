// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (outDirRelative: string) => {
  const copy: StartPlugin = ({ input, logPath }) => {
    const path = require('path')
    const makethen = require('makethen')
    const fs = require('graceful-fs')
    const makeDir = makethen(require('mkdirp'))

    return Promise.all(
      input.map((file) => {
        // file.path = /Users/foo/test/packages/beep/src/boop/index.js
        // process.cwd = /Users/foo/test
        // outDirRelative = packages/beep/build

        // /Users/foo/test/packages/beep/src/boop/index.js -> index.js
        const inFile = path.basename(file.path)
        // /Users/foo/test/packages/beep/src/boop/index.js -> /Users/foo/test/packages/beep/src/boop
        const inDir = path.dirname(file.path)
        // /Users/foo/test/packages/beep/src/boop -> packages/beep/src/boop
        const inDirRelative = path.relative(process.cwd(), inDir)
        // src/beep -> [ 'packages', 'beep', 'src', 'boop ]
        const inDirSplit = inDirRelative.split(path.sep)
        // [ 'packages', 'beep', 'build' ]
        const outDirSplit = outDirRelative.split(path.sep)
        // [ 'packages', 'beep', 'src', 'boop ] + [ 'packages', 'beep', 'build' ]
        const inDirUnique = inDirSplit
          // [ 'packages', 'beep', 'src', 'boop ] -> [ 'src', 'boop' ]
          .filter((segment, index) => segment !== outDirSplit[index])
          // [ 'src', 'boop' ] -> [ 'boop' ]
          .slice(1)
          // [ 'boop' ] -> 'boop'
          .join(path.sep)
        // packages/beep/build + boop -> /Users/foo/test/packages/beep/build/boop
        const outDir = path.resolve(outDirRelative, inDirUnique)
        // packages/beep/build/boop + index.js ->  /Users/foo/test/packages/beep/build/boop/index.js
        const outFile = path.join(outDir, inFile)

        return makeDir(outDir).then(() => {
          return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(file.path)
            const writeStream = fs.createWriteStream(outFile)

            readStream.on('error', reject)
            writeStream.on('error', reject)
            writeStream.on('finish', () => {
              logPath(outFile)
              resolve(file)
            })

            readStream.pipe(writeStream)
          })
        })
      })
    )
  }

  return copy
}
