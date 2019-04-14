import plugin, { StartDataFile, StartDataFilesProps } from '@start/plugin/src/'
import { TransformOptions } from '@babel/core'

export default (userOptions?: TransformOptions) =>
  plugin('babel', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
    const { transform } = await import('@babel/core')

    return {
      files: await Promise.all(
        files.reduce((result, file): StartDataFile[] => {
          const options: TransformOptions = {
            ...userOptions,
            ast: false,
            inputSourceMap: file.map != null ? file.map : false,
            filename: file.path
          }
          const transformed = transform(file.data, options)

          if (transformed !== null) {
            if (typeof transformed.code !== 'string') {
              return result
            }

            const dataFile: StartDataFile = {
              path: file.path,
              data: transformed.code
            }

            if (options.sourceMaps && typeof transformed.map === 'string') {
              dataFile.map = transformed.map
            }

            logPath(file.path)

            result.push(dataFile)
          }

          return result
        }, [] as StartDataFile[])
      )
    }
  })
