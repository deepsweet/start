// @flow
import type { StartPlugin } from '@start/task/src/'

export default (config: {}, userStatsOptions?: {}) => {
  const webpack: StartPlugin = ({ input, logMessage }) => {
    const makethen = require('makethen')
    const webpackLib = makethen(require('webpack'))

    const statsOptions = {
      colors: true,
      ...userStatsOptions,
    }

    return webpackLib(config).then((stats) => {
      logMessage(stats.toString(statsOptions))

      return input
    })
  }

  return webpack
}
