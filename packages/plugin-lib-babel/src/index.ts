import plugin, { StartFile } from '@start/plugin/src/'

type Options = {
  [key: string]: any
}

export default (userOptions?: Options) =>
  plugin('babel', async ({ files, logFile }) => {
    const { transformAsync } = await import('@babel/core')

    return Promise.all(
      files.map(
        async (file) => {
          const options: Options = {
            ...userOptions,
            ast: false,
            inputSourceMap: file.map != null ? file.map : false,
            filename: file.path
          }
          const result = await transformAsync(file.data, options)

          return {
            ...file,
            data: result.code,
            map: result.map
          }
        }
      )
    )
  })
