import plugin from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) =>
  plugin('find', async ({ files, logFile }) => {
    const { default: globby } = await import('globby')

    const options = {
      absolute: true,
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      ignore: ['node_modules/**'],
      ...userOptions
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
