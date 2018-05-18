import plugin, { StartFiles } from '@start/plugin/src/'

type KarmaConfig = {
  [key: string]: any
}

export default (config: KarmaConfig) =>
  plugin('karma', async ({ files }) => {
    const { default: { Server } } = await import('karma')

    return new Promise<StartFiles>((resolve, reject) => {
      const karmaServer = new Server(config)

      karmaServer.on('run_complete', (browsers, results) => {
        if (results.exitCode !== 0) {
          reject(null)
        } else {
          resolve(files)
        }
      })

      karmaServer.start()
    })
  })
