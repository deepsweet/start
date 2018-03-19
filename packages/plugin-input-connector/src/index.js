// @flow
import type { StartPlugin } from '@start/task/src/'

export default (files: string[]) => {
  const inputConnector: StartPlugin = ({ logPath }) => {
    const path = require('path')

    return files.map((file) => {
      logPath(file)

      return {
        path: path.resolve(file),
        data: null,
        map: null,
      }
    })
  }

  return inputConnector
}
