// @flow
/* eslint-disable standard/no-callback-literal */
/* eslint-disable promise/catch-or-return */
import type { StartPlugin } from '@start/sequence/src/'

export default (glob: string | string[], userEvents?: string[], userOptions?: {}) => (
  callback: StartPlugin
) => {
  const watch: StartPlugin = ({ logMessage, taskName }) => {
    const chokidar = require('chokidar')

    const callbackPromise = (...args) => Promise.resolve(callback(...args))
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
      watcher.once('ready', () => {
        watcher.removeListener('add', initialListener)

        const watchForChanges = () => {
          events.forEach((event) => {
            watcher.once(event, (file) =>
              callbackPromise({
                taskName,
                input: [
                  {
                    path: file,
                    data: null,
                    map: null,
                  },
                ],
              })
                .then(watchForChanges)
                .catch(watchForChanges)
            )
          })
        }

        callbackPromise({
          taskName,
          input: initialFiles,
        })
          .then(watchForChanges)
          .catch(watchForChanges)
          .then(() => {
            if (typeof logMessage === 'function') {
              logMessage('watching for changes, press ctrl-c to exit')
            }
          })
      })
    })
  }

  return watch
}
