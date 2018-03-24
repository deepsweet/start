// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (config: {}, userStatsOptions?: {}) => {
  const webpack: StartPlugin = ({ input, logMessage }) => {
    const makethen = require('makethen')
    const webpackLib = makethen(require('webpack'))

    const statsOptions = {
      colors: true,
      ...userStatsOptions,
    }

    return webpackLib(config).then((stats) => {
      if (typeof logMessage === 'function') {
        logMessage(stats.toString(statsOptions))
      }

      if (stats.hasErrors()) {
        return Promise.reject()
      }

      return input
    })
  }

  return webpack
}
