import plugin, { StartFile, StartFilesProps } from '@start/plugin/src/'

export default (outDir: string) =>
  plugin('unpack', ({ logPath }) => async ({ files }: StartFilesProps) => {
    const path = await import('path')
    const { default: unpack } = await import('decompress')

    return {
      files: (
        await Promise.all(
          files.map(async (file) => {
            let unpackedFiles = await unpack(file.path, outDir)

            return unpackedFiles.map((unpackedFile): StartFile => {
              const fullPath = path.resolve(outDir, unpackedFile.path)

              logPath(fullPath)

              return {
                path: fullPath
              }
            })
          })
        )
      ).reduce((result, next) => result.concat(next), [] as StartFile[])
    }
  })
