// @flow
import type { StartPlugin } from '@start/task/src/'

export default (options?: {}) => {
  const webpackServe: StartPlugin = ({ input, logMessage }) => {
    const serve = require('webpack-serve')

    return serve(options).then((server) => {
      server.on('listening', () => {
        logMessage('up and running')
      })

      return input
    })
  }

  return webpackServe
}
