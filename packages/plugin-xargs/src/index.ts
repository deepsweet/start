import plugin from '@start/plugin/src/'

type Options = {
  maxProcesses?: number
}

export default (taskName: string, options: Options = {}) => (...args: string[]) =>
  plugin('xargs', () => async () => {
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
      args.map((arg) => {
        const spawnCommand = process.argv[0]
        const spawnArgs = [process.argv[1], taskName, arg]

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
