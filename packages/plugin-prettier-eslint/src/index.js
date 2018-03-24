// @flow
import type { StartPlugin } from '@start/sequence/src/'
import type { PrettierEslintOptions } from 'prettier-eslint'

export default (options?: PrettierEslintOptions) => {
  const prettierEslint: StartPlugin = ({ input, logPath }) => {
    const format = require('prettier-eslint')

    return input.reduce((result, file) => {
      if (file.data == null) {
        throw 'file data is required'
      }

      const formatted = format({ ...options, filePath: file.path, text: file.data })

      if (file.data === formatted) {
        return result
      }

      if (typeof logPath === 'function') {
        logPath(file.path)
      }

      return [
        ...result,
        {
          ...file,
          data: formatted,
        },
      ]
    }, [])
  }

  return prettierEslint
}
