import { StartPlugin } from '@start/plugin-sequence'
import { Configuration as WebpackConfig } from 'webpack'

export default (config: WebpackConfig, userStatsOptions?: {}) => {
  const webpack: StartPlugin = async ({ input, log }) => {
    const makethen = await import('makethen')
    const webpackLib = await import('webpack')
    const compiler = makethen(webpackLib)

    const statsOptions = {
      colors: true,
      ...userStatsOptions,
    }

    return compiler(config).then((stats) => {
      log(stats.toString(statsOptions))

      if (stats.hasErrors()) {
        return Promise.reject(null)
      }

      return input
    })
  }

  return webpack
}
