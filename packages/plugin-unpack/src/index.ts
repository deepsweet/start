import plugin from '@start/plugin/src/'

export default (outDir: string) =>
  plugin('unpack', async ({ files, logFile }) => {
    const path = await import('path')
    const { default: unpack } = await import('decompress')

    return Promise.all(
      files
        .map(async (file) => {
          let unpackedFiles = await unpack(file.path, outDir)

          return unpackedFiles.map((unpackedFile) => {
            const fullPath = path.resolve(outDir, unpackedFile.path)

            logFile(fullPath)

            return {
              path: fullPath,
              data: null,
              map: null
            }
          })
        })
        .reduce((result, next) => result.concat(next), [])
    )
  })
