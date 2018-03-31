import { StartPlugin, StartFile } from '@start/plugin-sequence'
import { PrettierEslintOptions } from 'prettier-eslint'

export default (options?: PrettierEslintOptions) => {
  const prettierEslint: StartPlugin = ({ input, logPath }) => {
    const format = require('prettier-eslint')

    return Promise.all(
      input.map(
        (file) =>
          new Promise<StartFile>((resolve, reject) => {
            if (file.data == null) {
              return reject('file data is required')
            }

            const formatted: string = format({ ...options, filePath: file.path, text: file.data })

            if (file.data === formatted) {
              return resolve(null)
            }

            logPath(file.path)

            resolve({
              ...file,
              data: formatted,
            })
          })
      )
    ).then((files) => files.filter((file) => file !== null))
  }

  return prettierEslint
}
