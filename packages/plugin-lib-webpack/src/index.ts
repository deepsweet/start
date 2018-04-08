import plugin from '@start/plugin'
import { Configuration as WebpackConfig } from 'webpack'

export default (config: WebpackConfig, userStatsOptions?: {}) =>
  plugin('webpack', async ({ files, log }) => {
    const makethen = await import('makethen')
    const webpackLib = await import('webpack')
    const compiler = makethen(webpackLib)

    const statsOptions = {
      colors: true,
      ...userStatsOptions
    }

    return compiler(config).then((stats) => {
      log(stats.toString(statsOptions))

      if (stats.hasErrors()) {
        return Promise.reject(null)
      }

      return files
    })
  })
