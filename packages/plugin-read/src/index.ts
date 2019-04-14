import plugin, { StartDataFile, StartFilesProps } from '@start/plugin/src/'

export default plugin('read', ({ logPath }) => async ({ files }: StartFilesProps) => {
  const { promisify } = await import('util')
  const { readFile } = await import('graceful-fs')

  const pReadFile = promisify(readFile)

  return {
    files: await Promise.all(
      files.map(async (file): Promise<StartDataFile> => {
        const data = await pReadFile(file.path, 'utf8')

        logPath(file.path)

        return {
          path: file.path,
          data
        }
      })
    )
  }
})
