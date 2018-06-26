import plugin from '@start/plugin/src/'

type KarmaConfig = {
  [key: string]: any
}

export default (config: KarmaConfig) =>
  plugin('karma', async () => {
    const { Server } = await import('karma')

    await new Promise<void>((resolve, reject) => {
      const karmaServer = new Server(config)

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
