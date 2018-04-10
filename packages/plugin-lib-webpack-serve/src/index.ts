import plugin from '@start/plugin/src/'
import { Configuration as WebpackConfig } from 'webpack'

type Options = {
  config: WebpackConfig
  [key: string]: any
}

export default (options?: Options) =>
  plugin('webpackServe', async ({ files }) => {
    const serve = await import('webpack-serve')

    return serve(options).then(() => files)
  })
