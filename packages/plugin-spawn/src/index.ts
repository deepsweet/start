import { StartPlugin } from '@start/plugin-sequence'

export default (command: string, args?: string[], userOptions?: {}) => {
  const spawn: StartPlugin = async ({ input }) => {
    const { default: execa } = await import('execa')

    const options = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
      ...userOptions,
    }

    return execa(command, args, options)
      .then(() => input)
      .catch((error) => {
        if (options.stderr) {
          return Promise.reject(null)
        }

        throw error
      })
  }

  return spawn
}
