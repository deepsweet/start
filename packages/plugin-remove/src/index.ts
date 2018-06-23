import plugin from '@start/plugin/src/'

export default plugin('remove', async ({ files, logFile }) => {
  const { default: dleet } = await import('dleet')

  return {
    files: await Promise.all(
      files.map(async (file) => {
        await dleet(file.path)

        logFile(file.path)
      })
    )
  }
})
