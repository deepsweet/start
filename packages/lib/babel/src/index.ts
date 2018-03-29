import { StartPlugin, StartInput_ } from '@start/sequence/src/'

export default (userOptions?: {}) => {
  const babel: StartPlugin = async ({ input, logPath }) => {
    const { default: { transform } } = await import('@babel/core')

    return Promise.all(
      input.map(
        (file) =>
          new Promise<StartInput_>((resolve, reject) => {
            const options = {
              ...userOptions,
              ast: false,
              inputSourceMap: file.map != null ? file.map : false,
              filename: file.path,
            }

            if (file.data == null) {
              return reject('file data is required')
            }

            const result = transform(file.data, options)

            logPath(file.path)

            resolve({
              ...file,
              data: result.code,
              map: result.map,
            })
          })
      )
    )
  }

  return babel
}
