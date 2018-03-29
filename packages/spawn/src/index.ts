import { StartPlugin } from '@start/sequence/src/'

export default (command: string, args?: string[], userOptions?: {}) => {
  const spawn: StartPlugin = async () => {
    const { default: execa } = await import('execa')

    const options = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: true,
      },
      ...userOptions,
    }

    return execa(command, args, options).catch((error) => {
      if (options.stderr) {
        return Promise.reject(null)
      }

      throw error
    })
  }

  return spawn
}
