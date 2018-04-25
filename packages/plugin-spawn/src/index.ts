import plugin from '@start/plugin/src/'

export default (cli: string[], userOptions?: {}) =>
  plugin('spawn', async ({ files }) => {
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

    return execa(command, args, options)
      .then(() => files)
      .catch((error) => {
        if (options.stderr) {
          throw null
        }

        throw error
      })
  })
