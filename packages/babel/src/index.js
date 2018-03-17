// @flow
import type { StartPlugin } from '@start/task/src/'
import type { BabelTransformOptions } from '@babel/core'

export default (userOptions?: BabelTransformOptions) => {
  const babel: StartPlugin = ({ input, logPath }) => {
    const { transform } = require('@babel/core')

    return Promise.resolve(
      input.map((file) => {
        const options = {
          ...userOptions,
          ast: false,
          inputSourceMap: file.map != null ? file.map : false,
          filename: file.path,
        }

        if (file.data == null) {
          throw new Error('@start/babel plugin requires file data')
        }

        const result = transform(file.data, options)

        logPath(file.path)

        return {
          ...file,
          data: result.code,
          map: result.map,
        }
      })
    )
  }

  return babel
}
