import plugin from '@start/plugin'

export default plugin('codecov', async ({ files, log }) => {
  const { default: codecovLite } = await import('codecov-lite')

  return Promise.all(
    files.map((file) => {
      return codecovLite(file.data).then((result) => {
        log(result.reportURL)

        return file
      })
    })
  )
})
