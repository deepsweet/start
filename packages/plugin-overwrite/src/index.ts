import plugin, { StartDataFilesProps } from '@start/plugin/src/'

export default plugin('overwrite', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
  const { promisify } = await import('util')
  const { writeFile } = await import('graceful-fs')

  const pWriteFile = promisify(writeFile)

  return {
    files: await Promise.all(
      files.map(async (file) => {
        await pWriteFile(file.path, file.data, 'utf8')

        logPath(file.path)

        return file
      })
    )
  }
})
