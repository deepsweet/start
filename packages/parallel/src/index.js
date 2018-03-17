// @flow
import type { StartPlugin } from '@start/task/src/'

export default (...tasks: string[]) => (...args: string[]) => {
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
      tasks.map((task) => {
        const modifiedArgv = buildArgv(
          {
            ...parsedArgv,
            _: [task, ...args],
          },
          buildArgvOptions
        )
        const spawnArgs = [startCommand, ...modifiedArgv]

        return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject(null))
      })
    )
  }

  return parallel
}
