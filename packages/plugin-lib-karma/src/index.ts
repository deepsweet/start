import plugin from '@start/plugin/src/'
import { ConfigOptions } from 'karma'

export default (options: ConfigOptions) =>
  plugin('karma', () => async () => {
    const { Server } = await import('karma')

    await new Promise<void>((resolve, reject) => {
      const karmaServer = new Server(options)

      karmaServer.on('run_complete', (browsers, results) => {
        if (results.exitCode !== 0) {
          reject(null)
        } else {
          resolve()
        }
      })

      karmaServer.start()
    })
  })
