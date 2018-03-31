import { StartPlugin } from '@start/plugin-sequence'

const codecov: StartPlugin = async ({ input, logMessage }) => {
  const { default: codecovLite } = await import('codecov-lite')

  return Promise.all(
    input.map((file) => {
      return codecovLite(file.data).then((result) => {
        logMessage(result.reportURL)

        return file
      })
    })
  )
}

export default codecov
