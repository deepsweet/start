// @flow
import type { StartPlugin } from '@start/task/src/'

export default (command: string, args?: string[], userOptions?: {}) => {
  const spawn: StartPlugin = () => {
    const execa = require('execa')

    const options = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: true,
      },
      ...userOptions,
    }

    return execa(command, args, options).catch((error) => {
      if (options.stderr) {
        return Promise.reject()
      }

      throw error
    })
  }

  return spawn
}
