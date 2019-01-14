import plugin from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) =>
  plugin('find', async ({ logFile }) => {
    const { default: globby } = await import('globby')

    const options = {
      ignore: ['node_modules/**'],
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      absolute: true,
      ...userOptions
    }
    const result = await globby(glob, options)

    result.forEach(logFile)

    return {
      files: result.map((file) => ({
        path: file,
        data: null,
        map: null
      }))
    }
  })
