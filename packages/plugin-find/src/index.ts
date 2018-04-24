import plugin from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) =>
  plugin('find', async ({ files, logFile }) => {
    const { default: globby } = await import('globby')

    const options = {
      ignore: ['node_modules/**'],
      ...userOptions,
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      absolute: true
    }

    return globby(glob, options).then((files) =>
      files.map((file) => {
        logFile(file)

        return {
          path: file,
          data: null,
          map: null
        }
      })
    )
  })
