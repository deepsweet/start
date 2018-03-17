// @flow
/* eslint-disable standard/no-callback-literal */
import type { StartPlugin, StartTask } from '@start/task/src/'

export default (glob: string | string[], userEvents?: string[], userOptions?: {}) => (
  callback: StartTask
) => {
  const watch: StartPlugin = ({ logMessage, taskName }) => {
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
      watcher.once('ready', () => {
        watcher.removeListener('add', initialListener)

        const watchForChanges = () => {
          events.forEach((event) => {
            watcher.once(event, (file) =>
              callback({
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

        callback({
          taskName,
          input: initialFiles,
        })
          .then(watchForChanges)
          .catch(watchForChanges)
          .then(() => {
            logMessage('watching for changes, press ctrl-c to exit')
          })
      })
    })
  }

  return watch
}
