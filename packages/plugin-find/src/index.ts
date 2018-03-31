import { StartPlugin } from '@start/plugin-sequence'

export default (glob: string | string[], userOptions?: {}) => {
  const find: StartPlugin = async ({ logPath }) => {
    const { default: globby } = await import('globby')

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
