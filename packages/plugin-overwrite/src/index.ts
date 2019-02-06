import plugin, { StartDataFilesProps } from '@start/plugin/src/'

export default plugin('overwrite', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
  const { promisify } = await import('util')
  const gracefulFs = await import('graceful-fs')
  const writeFile = promisify(gracefulFs.writeFile)

  return {
    files: await Promise.all(
      files.map(async (file) => {
        await writeFile(file.path, file.data, 'utf8')

        logPath(file.path)

        return file
      })
    )
  }
})
