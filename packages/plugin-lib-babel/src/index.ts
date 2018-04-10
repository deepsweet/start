import plugin, { StartFile } from '@start/plugin/src/'

export default (userOptions?: {}) =>
  plugin('babel', async ({ files, logFile }) => {
    const { default: { transform } } = await import('@babel/core')

    return Promise.all(
      files.map(
        (file) =>
          new Promise<StartFile>((resolve, reject) => {
            const options = {
              ...userOptions,
              ast: false,
              inputSourceMap: file.map != null ? file.map : false,
              filename: file.path
            }

            if (file.data == null) {
              return reject('file data is required')
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
