// @flow
import type { StartPlugin, StartTask } from '@start/task/src/'

type StartTaskRunner = () => StartTask

export default (...taskRunners: StartTaskRunner[]) => (...args: string[]) => {
  const parallel: StartPlugin = () => {
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
      taskRunners.map((taskRunner) => {
        const spawnCommand = process.argv[0]
        const spawnArgs = [process.argv[1], taskRunner.name, ...process.argv.slice(3)]

        return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject())
      })
    )
  }

  return parallel
}
