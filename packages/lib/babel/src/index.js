// @flow
import type { StartPlugin } from '@start/sequence/src/'
import type { BabelTransformOptions } from '@babel/core'

export default (userOptions?: BabelTransformOptions) => {
  const babel: StartPlugin = ({ input, logPath }) => {
    const { transform } = require('@babel/core')

    return Promise.all(
      input.map(
        (file) =>
          new Promise((resolve, reject) => {
            const options = {
              ...userOptions,
              ast: false,
              inputSourceMap: file.map != null ? file.map : false,
              filename: file.path,
            }

            if (file.data == null) {
              return reject('file data is required')
            }

            const result = transform(file.data, options)

            if (typeof logPath === 'function') {
              logPath(file.path)
            }

            resolve({
              ...file,
              data: result.code,
              map: result.map,
            })
          })
      )
    )
  }

  return babel
}
