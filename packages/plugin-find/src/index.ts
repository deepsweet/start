import plugin from '@start/plugin'

export default (glob: string | string[], userOptions?: {}) =>
  plugin('find', async ({ files, log }) => {
    const { default: globby } = await import('globby')

    const options = {
      absolute: false,
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      ignore: ['node_modules/**'],
      ...userOptions
    }

    return globby(glob, options).then((files) =>
      files.map((file) => {
        log(file)

        return {
          path: file,
          data: null,
          map: null
        }
      })
    )
  })
