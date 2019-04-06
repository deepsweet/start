import plugin from '@start/plugin/src/'
import { Configuration as WebpackConfig } from 'webpack'
import { Configuration as TWebpackDevServerConfig } from 'webpack-dev-server'

export type TWebpackConfig = WebpackConfig & {
  devServer: TWebpackDevServerConfig
}

export default (config: TWebpackConfig, devServerConfig?: TWebpackDevServerConfig) =>
  plugin('webpackDevServer', ({ logMessage }) => async () => {
    const { default: Webpack } = await import('webpack')
    const { default: WebpackDevServer } = await import('webpack-dev-server')

    const compiler = Webpack(config)
    const { host, port, ...options }: TWebpackDevServerConfig = {
      host: '127.0.0.1',
      port: 8080,
      ...config.devServer,
      ...devServerConfig
    }
    const server = new WebpackDevServer(compiler, options)
    let isDone = false

    await new Promise<void>((resolve, reject) => {
      compiler.hooks.done.tap('done', () => {
        if (!isDone) {
          logMessage(`http://${host}:${port}/`)
        }

        isDone = true

        resolve()
      })

      server
        .listen(port, host, (error) => {
          if (error) {
            reject(error)
          }
        })
        .on('error', reject)
    })
  })
