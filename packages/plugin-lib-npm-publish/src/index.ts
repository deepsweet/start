import { StartPlugin } from '@start/plugin-sequence'

// https://docs.npmjs.com/cli/publish
export default (packagePath: string = '.', userOptions?: {}) => {
  const npmPublish: StartPlugin = async ({ input }) => {
    const { default: execa } = await import('execa')

    const options = {
      registry: 'https://registry.npmjs.org/',
      ...userOptions,
    }

    const cliOptions = Object.keys(options).reduce((result, key) => {
      return [...result, `--${key}=${options[key]}`]
    }, [])

    return execa('npm', ['publish', ...cliOptions, packagePath], {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
    })
      .then(() => input)
      .catch(() => Promise.reject(null))
  }

  return npmPublish
}
