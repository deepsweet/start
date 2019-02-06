import plugin, { StartDataFile, StartDataFilesProps } from '@start/plugin/src/'

type Options = {
  [key: string]: any
}

export default (userOptions?: Options) =>
  plugin('babel', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
    // @ts-ignore
    const { transformAsync } = await import('@babel/core')

    return {
      files: await Promise.all(
        files.map(async (file): Promise<StartDataFile> => {
          const options: Options = {
            ...userOptions,
            ast: false,
            inputSourceMap: file.map != null ? file.map : false,
            filename: file.path
          }
          const result = await transformAsync(file.data, options)

          logPath(file.path)

          return {
            path: file.path,
            data: result.code,
            map: result.map
          }
        }
        )
      )
    }
  })
