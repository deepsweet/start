// @flow
import type { StartPlugin } from '@start/task/src/'

export default (callback: (file: string) => string) => {
  const rename: StartPlugin = ({ input, logPath }) => {
    const path = require('path')

    return Promise.all(
      input.map((file) => {
        return Promise.resolve(callback(file.path)).then((newPath) => {
          if (file.path === newPath) {
            return file
          }

          logPath(newPath)

          if (file.map) {
            // TODO: why not?
            // file.map.file = path.basename(newPath)
            file.map = {
              ...file.map,
              file: path.basename(newPath),
            }
          }

          return {
            path: newPath,
            data: file.data,
            map: file.map,
          }
        })
      })
    )
  }

  return rename
}
