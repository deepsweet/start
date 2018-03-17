// @flow
import type { StartPlugin } from '@start/task/src/'

type UserServerOptions = {|
  host: string,
  port: number,
|}

export default (
  config: {},
  userDevServerOptions?: {},
  userServerOptions?: UserServerOptions = {
    host: 'localhost',
    port: 3000,
  }
) => {
  const webpackDevServer: StartPlugin = ({ input, logMessage }) => {
    const makethen = require('makethen')
    const webpackLib = require('webpack')
    const WebpackDevServer = require('webpack-dev-server')

    const options = {
      stats: {
        colors: true,
      },
      ...userDevServerOptions,
    }
    const { port, host } = userServerOptions
    const server = new WebpackDevServer(webpackLib(config), options)

    return makethen(server.listen)(port, host).then(() => {
      return input
    })
  }

  return webpackDevServer
}
