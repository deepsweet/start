// @flow
import { StartPlugin } from '@start/sequence/src/'

type StartTask = (...args: string[]) => StartPlugin

export default (options?: {}) => (...tasks: StartTask[]) => (...args: string[]) => () => {
  const execa = require('execa')

  const spawnOptions = {
    stdout: process.stdout,
    stderr: process.stderr,
    stripEof: false,
    env: {
      FORCE_COLOR: true,
    },
  }

  return Promise.all(
    tasks.map((task) => {
      const spawnCommand = process.argv[0]
      const spawnArgs = [process.argv[1], task.name, ...process.argv.slice(3)]

      return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject())
    })
  )
}
