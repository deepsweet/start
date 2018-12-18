/* eslint-disable standard/no-callback-literal */
/* eslint-disable promise/catch-or-return */
import plugin, { StartFile, StartFilesProps, StartPlugin } from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) => (target: StartPlugin<StartFilesProps, any>) =>
  plugin('watch', (utils) => async () => {
    const chokidar = await import('chokidar')

    const targetRunner = await target
    const events = ['add', 'change']
    const options = {
      cwd: process.cwd(),
      persistent: true,
      ...userOptions
    }

    await new Promise<StartFile[]>((resolve, reject) => {
      const initialFiles: StartFile[] = []
      const initialListener = (file: string) => {
        initialFiles.push({
          path: file
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
                await targetRunner(utils)({
                  files: [{
                    path: file
                  }]
                })
              } finally {
                watchForChanges()
              }
            })
          })
        }

        try {
          await targetRunner(utils)({
            files: initialFiles
          })
        } finally {
          watchForChanges()
          utils.logMessage('watching for changes, press ctrl-c to exit')
        }
      })
    })
  })
