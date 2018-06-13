import plugin, { StartFile } from '@start/plugin/src/'

export default (outDirRelative: string) =>
  plugin('copy', async ({ files, logFile }) => {
    const path = await import('path')
    const { createReadStream, createWriteStream } = await import('graceful-fs')
    const { default: movePath } = await import('move-path')
    const { default: makeDir } = await import('make-dir')

    return {
      files: await Promise.all(
        files.map((file) => {
          const outFile = movePath(file.path, outDirRelative)
          const outDir = path.dirname(outFile)

          return makeDir(outDir).then(() => {
            return new Promise<StartFile>((resolve, reject) => {
              const readStream = createReadStream(file.path)
              const writeStream = createWriteStream(outFile)

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
    }
  })
