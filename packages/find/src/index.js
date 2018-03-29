// @flow
import { StartPlugin } from '@start/sequence/src/'
import { Glob, GlobbyOptions } from 'globby'

export default (glob: Glob, userOptions?: GlobbyOptions) => {
  const find: StartPlugin = ({ logPath }) => {
    const globby = require('globby')

    const options: GlobbyOptions = {
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
