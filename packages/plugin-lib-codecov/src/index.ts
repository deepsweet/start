import plugin, { StartDataFile, StartDataFilesProps } from '@start/plugin/src/'

export default plugin('codecov', ({ logMessage }) => async ({ files }: StartDataFilesProps) => {
  // @ts-ignore
  const { default: codecovLite } = await import('codecov-lite')

  return {
    files: await Promise.all(
      files.map((file): StartDataFile =>
        codecovLite(file.data).then((result: any) => {
          logMessage(result.reportURL)

          return file
        })
      )
    )
  }
})
