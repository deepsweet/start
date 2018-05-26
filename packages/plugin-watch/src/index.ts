/* eslint-disable standard/no-callback-literal */
/* eslint-disable promise/catch-or-return */
import plugin, { StartFiles, StartPlugin } from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) => (target: StartPlugin) =>
  plugin('watch', async ({ logMessage, reporter }) => {
    const chokidar = await import('chokidar')

    const targetRunner = await target
    const events = ['add', 'change']
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
                await targetRunner({
                  reporter,
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
          await targetRunner({
            reporter,
            files: initialFiles
          })
        } finally {
          watchForChanges()
          logMessage('watching for changes, press ctrl-c to exit')
        }
      })
    })
  })
