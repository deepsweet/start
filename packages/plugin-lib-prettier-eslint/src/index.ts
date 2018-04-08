import plugin, { StartFile } from '@start/plugin'
import { PrettierEslintOptions } from 'prettier-eslint'

export default (options?: PrettierEslintOptions) =>
  plugin('prettierEslint', async ({ files, log }) => {
    const { default: format } = await import('prettier-eslint')

    return Promise.all(
      files.map((file) =>
        new Promise<StartFile>((resolve, reject) => {
          if (file.data == null) {
            return reject('file data is required')
          }

          const formatted: string = format({ ...options, filePath: file.path, text: file.data })

          if (file.data === formatted) {
            return resolve(null)
          }

          log(file.path)

          resolve({
            ...file,
            data: formatted
          })
        })
      )
    ).then((files) => files.filter((file) => file !== null))
  })
