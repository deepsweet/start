// @flow
import type { StartPlugin } from '@start/task/src/'

export default (glob: string | string[], userOptions?: {}) => {
  const find: StartPlugin = ({ logPath }) => {
    const globby = require('globby')

    const options = {
      absolute: true,
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      ignore: ['node_modules/**'],
      ...userOptions,
    }

    return globby(glob, options).then((files) =>
      files.map((file) => {
        logPath(file)

        return {
          path: file,
          data: null,
          map: null,
        }
      })
    )
  }

  return find
}
