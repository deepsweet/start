import plugin from '@start/plugin/src/'

type Options = {
  packagePath?: string,
  message?: string,
  [key: string]: boolean | string
}

// https://docs.npmjs.com/cli/version
export default (version: string, userOptions?: Options) =>
  plugin('npmVersion', async ({ files }) => {
    const { default: execa } = await import('execa')

    const { packagePath, ...options } = {
      packagePath: '.',
      ...userOptions
    }
    const cliArgs = Object.keys(options).reduce((result, key) => {
      const value = options[key]

      if (typeof value === 'boolean') {
        return result.concat(`--${key}`)
      }

      if (typeof value === 'string') {
        return result.concat(`--${key}`, `${value}`)
      }

      return result
    }, [])

    try {
      await execa('npm', ['version', ...cliArgs, version], {
        cwd: packagePath,
        stdout: process.stdout,
        stderr: process.stderr,
        stripEof: false,
        env: {
          FORCE_COLOR: '1'
        }
      })
    } catch (e) {
      throw null
    }

    return { files }
  })
