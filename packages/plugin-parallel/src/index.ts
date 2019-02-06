import plugin from '@start/plugin/src/'

type Options = {
  maxProcesses?: number
}

export default (taskNames: string[], options: Options = {}) => (...args: string[]) =>
  plugin('parallel', () => async () => {
    const { default: execa } = await import('execa')
    const { default: pAll } = await import('p-all')

    const spawnOptions = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }
    const pAllOptions = {
      concurrency: options.maxProcesses || Infinity
    }

    await pAll(
      taskNames.map((taskName) => {
        const spawnCommand = process.argv[0]
        const spawnArgs = [process.argv[1], taskName, ...args]

        return async () => {
          try {
            await execa(spawnCommand, spawnArgs, spawnOptions)
          } catch (e) {
            throw null
          }
        }
      }),
      pAllOptions
    )
  })
