// @flow
/* eslint-disable standard/no-callback-literal */
/* eslint-disable promise/catch-or-return */
import { StartPlugin } from '@start/sequence/src/'

export default (glob: string | string[], userEvents?: string[], userOptions?: {}) => (
  callback: StartPlugin
) => {
  const watch: StartPlugin = ({ logMessage, ...rest }) => {
    const chokidar = require('chokidar')

    const events = userEvents || ['add', 'change']
    const options = {
      persistent: true,
      ...userOptions,
    }

    return new Promise((resolve, reject) => {
      const initialFiles = []
      const initialListener = (file) => {
        initialFiles.push({
          path: file,
          data: null,
          map: null,
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
                  input: [
                    {
                      path: file,
                      data: null,
                      map: null,
                    },
                  ],
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
            input: initialFiles,
          })
        } finally {
          watchForChanges()
          logMessage('watching for changes, press ctrl-c to exit')
        }
      })
    })
  }

  return watch
}
