import { StartPlugin } from '@start/sequence'

type StartTask = (...args: string[]) => StartPlugin

export default (options?: {}) => (...tasks: StartTask[]) => (...args: string[]) => async ({
  input,
}) => {
  const { default: execa } = await import('execa')

  const spawnOptions = {
    stdout: process.stdout,
    stderr: process.stderr,
    stripEof: false,
    env: {
      FORCE_COLOR: '1',
    },
  }

  return Promise.all(
    tasks.map((task) => {
      const spawnCommand = process.argv[0]
      const spawnArgs = [process.argv[1], task.name, ...process.argv.slice(3)]

      return execa(spawnCommand, spawnArgs, spawnOptions).catch(() => Promise.reject(null))
    })
  ).then(() => input)
}
