import plugin from '@start/plugin/src/'
import { DecompressOptions } from 'decompress';

export default (outDirRelative: string, options?: DecompressOptions) =>
  plugin('decompress', async ({ files, logFile, logMessage }) => {
    const { default: decompress } = await import('decompress')
    const path = await import('path')
    
    return Promise.all(
      files.map(async file => {
        try {
          logFile(outDirRelative)
          let decompressedFiles = await decompress(file.path, outDirRelative, options)
          logMessage(`Decompressed ${path.basename(file.path)} to ${outDirRelative}`)
          return await { path: outDirRelative, data: null, map: null }
        } catch (error) {
          console.error(error)
        }
      })
    )
  })