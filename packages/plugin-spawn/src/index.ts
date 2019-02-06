import plugin from '@start/plugin/src/'

export default (cli: string[], userOptions?: {}) =>
  plugin('spawn', () => async () => {
    const { default: execa } = await import('execa')

    const [ command, ...args ] = cli
    const options = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      },
      ...userOptions
    }

    try {
      await execa(command, args, options)
    } catch (error) {
      if (options.stderr) {
        throw null
      }

      throw error
    }
  })
