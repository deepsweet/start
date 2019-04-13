import plugin, { StartDataFilesProps } from '@start/plugin/src/'

export default plugin('codecov', ({ logMessage }) => async ({ files }: StartDataFilesProps) => {
  const { default: codecovLite } = await import('codecov-lite')

  await Promise.all(
    files.map(async (file) => {
      const { reportURL } = await codecovLite(process.env, file.data)

      logMessage(reportURL)
    })
  )

  return files
})
