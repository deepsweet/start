// @flow
import type { StartPlugin } from '@start/sequence/src/'
import type { PrettierEslintOptions } from 'prettier-eslint'

export default (options?: PrettierEslintOptions) => {
  const prettierEslint: StartPlugin = ({ input, logPath }) => {
    const format = require('prettier-eslint')

    return Promise.all(
      input.map(
        (file) =>
          new Promise((resolve, reject) => {
            if (file.data == null) {
              return reject('file data is required')
            }

            const formatted = format({ ...options, filePath: file.path, text: file.data })

            if (file.data === formatted) {
              return resolve(null)
            }

            if (typeof logPath === 'function') {
              logPath(file.path)
            }

            resolve({
              ...file,
              data: formatted,
            })
          })
      )
      // $FlowFixMe ???
    ).then((files) => files.filter((file) => file !== null))
  }

  return prettierEslint
}
