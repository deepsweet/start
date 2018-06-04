import plugin from '@start/plugin/src/'
import { DecompressOptions } from 'decompress'

export default (outDirRelative: string, options?: DecompressOptions) =>
  plugin('decompress', async ({ files, logFile }) => {
    const { default: decompress } = await import('decompress')

    return Promise.all(
      files.map(async (file) => {
        let decompressedFiles = await decompress(file.path, outDirRelative, options)

        logPath(file.path)

        return file
      })
    )
  })
