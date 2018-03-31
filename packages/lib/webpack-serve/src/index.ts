import { StartPlugin } from '@start/sequence'
import { Configuration as WebpackConfig } from 'webpack'

type Options = {
  config: WebpackConfig
  [key: string]: any
}

export default (options?: Options) => {
  const webpackServe: StartPlugin = async ({ input, logMessage }) => {
    const serve = await import('webpack-serve')

    return serve(options).then(() => input)
  }

  return webpackServe
}
