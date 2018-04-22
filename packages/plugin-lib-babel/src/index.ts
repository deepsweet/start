import plugin, { StartFile } from '@start/plugin/src/'

type Options = {
  [key: string]: any
}

export default (userOptions?: Options) =>
  plugin('babel', async ({ files, logFile }) => {
    const { default: { transform } } = await import('@babel/core')

    return Promise.all(
      files.map(
        (file) =>
          new Promise<StartFile>((resolve) => {
            const options: Options = {
              ...userOptions,
              ast: false,
              inputSourceMap: file.map != null ? file.map : false,
              filename: file.path
            }

            const result = transform(file.data, options)

            logFile(file.path)

            resolve({
              ...file,
              data: result.code,
              map: result.map
            })
          })
      )
    )
  })
