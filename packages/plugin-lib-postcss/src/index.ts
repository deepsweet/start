import plugin, { StartDataFilesProps } from '@start/plugin/src/'
import { AcceptedPlugin, ProcessOptions } from 'postcss'

export type Options = {
  plugins?: AcceptedPlugin[],
  sourceMaps?: boolean,
  parser?: ProcessOptions['parser'],
  stringifier?: ProcessOptions['stringifier'],
  syntax?: ProcessOptions['syntax']
}

export default (options?: Options) =>
  plugin('postcss', ({ logMessage, logPath }) => async ({ files }: StartDataFilesProps) => {
    const { default: postcss } = await import('postcss')

    return {
      files: await Promise.all(
        files.map((file) => {
          const realOptions: ProcessOptions = {
            from: file.path,
            to: file.path
          }

          if (options && options.sourceMaps) {
            realOptions.map = {
              inline: false,
              annotation: false
            }
          }

          if (file.map !== null) {
            realOptions.map = {
              ...realOptions.map,
              prev: file.map
            }
          }

          const plugins = options && options.plugins
          const result = postcss(plugins).process(file.data, realOptions)

          logPath(file.path)

          return {
            path: file.path,
            data: result.css,
            map: result.map
          }
        })
      )
    }
  })
