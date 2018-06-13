import plugin from '@start/plugin/src/'

export default plugin('codecov', async ({ files, logMessage }) => {
  const { default: codecovLite } = await import('codecov-lite')

  return {
    files: await Promise.all(
      files.map((file) =>
        codecovLite(file.data).then((result) => {
          logMessage(result.reportURL)

          return file
        })
      )
    )
  }
})
