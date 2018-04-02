import { StartPlugin } from '@start/plugin-sequence'
import { Configuration as WebpackConfig } from 'webpack'

type Options = {
  config: WebpackConfig
  [key: string]: any
}

export default (options?: Options) => {
  const webpackServe: StartPlugin = async ({ input, log }) => {
    const serve = await import('webpack-serve')

    return serve(options).then(() => input)
  }

  return webpackServe
}
