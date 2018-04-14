import plugin, { StartFile } from '@start/plugin/src/'

export default (options?: {}) =>
  plugin('prettierEslint', async ({ files, logFile }) => {
    const { default: format } = await import('prettier-eslint')

    return Promise.all(
      files.map((file) =>
        new Promise<StartFile>((resolve, reject) => {
          if (file.data == null) {
            return reject('file data is required')
          }

          const formatted: string = format({ ...options, filePath: file.path, text: file.data })

          if (file.data !== formatted) {
            logFile(file.path)
          }

          resolve({
            ...file,
            data: formatted
          })
        })
      )
    )
  })
