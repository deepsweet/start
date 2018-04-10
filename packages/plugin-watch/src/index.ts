/* eslint-disable standard/no-callback-literal */
/* eslint-disable promise/catch-or-return */
import plugin, { StartFiles, StartPlugin } from '@start/plugin/src/'

export default (glob: string | string[], userEvents?: string[], userOptions?: {}) =>
  (callback: StartPlugin) =>
    plugin('watch', async ({ logMessage, ...rest }) => {
      const { default: chokidar } = await import('chokidar')

      const events = userEvents || ['add', 'change']
      const options = {
        cwd: process.cwd(),
        persistent: true,
        ...userOptions
      }

      return new Promise<StartFiles>((resolve, reject) => {
        const initialFiles = []
        const initialListener = (file) => {
          initialFiles.push({
            path: file,
            data: null,
            map: null
          })
        }

        const watcher = chokidar.watch(glob, options)

        watcher.on('add', initialListener)
        watcher.once('error', reject)
        watcher.once('ready', async () => {
          watcher.removeListener('add', initialListener)

          const watchForChanges = () => {
            events.forEach((event) => {
              watcher.once(event, async (file) => {
                try {
                  await callback({
                    ...rest,
                    logMessage,
                    files: [
                      {
                        path: file,
                        data: null,
                        map: null
                      }
                    ]
                  })
                } finally {
                  watchForChanges()
                }
              })
            })
          }

          try {
            await callback({
              ...rest,
              logMessage,
              files: initialFiles
            })
          } finally {
            watchForChanges()
            logMessage('watching for changes, press ctrl-c to exit')
          }
        })
      })
    })
