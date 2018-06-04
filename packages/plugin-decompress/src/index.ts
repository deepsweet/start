import plugin from '@start/plugin/src/'
import { DecompressOptions } from 'decompress'

export default (outDirRelative: string, options?: DecompressOptions) =>
  plugin('decompress', async ({ files, logFile }) => {
    const path = await import('path')
    const { default: decompress } = await import('decompress')

    return Promise.all(
      files.map(async (file) => {
        let decompressedFiles = await decompress(file.path, outDirRelative, options)

        return decompressedFiles.map((decompressedFile) => {
          const fullPath = path.resolve(outDirRelative, decompressedFile.path)

          logFile(fullPath)

          return {
            path: fullPath,
            data: null,
            map: null
          }
        })
      })
    )
  })
