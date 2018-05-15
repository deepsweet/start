import plugin, { StartFile } from '@start/plugin/src/'

export default (outDirRelative: string) =>
  plugin('copy', async ({ files, logFile }) => {
    const { default: path } = await import('path')
    const { default: makethen } = await import('makethen')
    const { default: fs } = await import('graceful-fs')
    const { default: movePath } = await import('move-path')
    const { default: mkdirp } = await import('mkdirp')
    const makeDir = makethen(mkdirp)

    return Promise.all(
      files.map((file) => {
        const outFile = movePath(file.path, outDirRelative)
        const outDir = path.dirname(outFile)

        return makeDir(outDir).then(() => {
          return new Promise<StartFile>((resolve, reject) => {
            const readStream = fs.createReadStream(file.path)
            const writeStream = fs.createWriteStream(outFile)

            readStream.on('error', reject)
            writeStream.on('error', reject)
            writeStream.on('finish', () => {
              logFile(outFile)
              resolve(file)
            })

            readStream.pipe(writeStream)
          })
        })
      })
    )
  })
