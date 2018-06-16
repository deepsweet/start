import plugin from '@start/plugin/src/'
import { Configuration as WebpackConfig } from 'webpack'

type Options = {
  config: WebpackConfig,
  [key: string]: any
}

export default (options: Options) =>
  plugin('webpackServe', async () => {
    const { default: serve } = await import('webpack-serve')

    await serve(options)
  })
