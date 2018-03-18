// @flow
import type { StartPlugin, StartTask } from '@start/task/src/'

type StartTaskRunner = () => StartTask

export default (...taskRunners: StartTaskRunner[]) => (...args: string[]) => {
  const parallel: StartPlugin = () => {
    const parseArgv = require('minimist')
    const buildArgv = require('dargs')
    const execa = require('execa')

    const spawnCommand = process.argv[0]
    const startCommand = process.argv[1]
    const parsedArgv = parseArgv(process.argv.slice(2))
    const spawnOptions = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: true,
      },
    }
    const buildArgvOptions = {
      useEquals: false,
    }

    return Promise.all(
      taskRunners.map((taskRunner) => {
        const modifiedArgv = buildArgv(
          {
            ...parsedArgv,
            _: [taskRunner.name, ...args],
          },
          buildArgvOptions
        )
        const spawnArgs = [startCommand, ...modifiedArgv]

        return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject())
      })
    )
  }

  return parallel
}
