import { StartPlugin } from '@start/plugin-sequence'

export default (outDirRoot: string) => {
  const copy: StartPlugin = async ({ input, log }) => {
    const { default: path } = await import('path')
    const { default: makethen } = await import('makethen')
    const { default: fs } = await import('graceful-fs')
    const { default: mkdirp } = await import('mkdirp')
    const makeDir = makethen(mkdirp)

    return Promise.all(
      input.map((file) => {
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

        return makeDir(outDir).then(() => {
          return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(file.path)
            const writeStream = fs.createWriteStream(outFile)

            readStream.on('error', reject)
            writeStream.on('error', reject)
            writeStream.on('finish', () => {
              log(outFile)
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
