// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (files: string[]) => {
  const inputConnector: StartPlugin = ({ logPath }) => {
    const path = require('path')

    return files.map((file) => {
      if (typeof logPath === 'function') {
        logPath(file)
      }

      return {
        path: path.resolve(file),
        data: null,
        map: null,
      }
    })
  }

  return inputConnector
}
