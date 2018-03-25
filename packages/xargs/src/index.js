// @flow
import type { StartPlugin } from '@start/sequence/src/'

type StartTask = (...args: string[]) => StartPlugin

export default (task: StartTask) => (...input: string[]) => () => {
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
    input.map((arg) => {
      const spawnCommand = process.argv[0]
      const spawnArgs = [process.argv[1], task.name, arg]

      return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject())
    })
  )
}
