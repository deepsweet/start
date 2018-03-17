// @flow
import type { StartPlugin } from '@start/task/src/'
import type { PrettierEslintOptions } from 'prettier-eslint'

export default (options?: PrettierEslintOptions) => {
  const prettierEslint: StartPlugin = ({ input, logPath }) => {
    const format = require('prettier-eslint')

    return Promise.all(
      input.map((file) => {
        if (file.data == null) {
          throw new Error('@start/prettier-eslint plugin requires file data')
        }

        const result = format({ ...options, filePath: file.path, text: file.data })

        return {
          ...file,
          data: result,
        }
      })
    )
  }

  return prettierEslint
}
