import plugin from '@start/plugin/src/'

type Options = {
  [key: string]: boolean | string
}

// https://docs.npmjs.com/cli/publish
export default (packagePath: string = '.', userOptions?: Options) =>
  plugin('npmPublish', () => async () => {
    const { default: execa } = await import('execa')

    const options: Options = {
      registry: 'https://registry.npmjs.org/',
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
    }, [] as string[])

    try {
      await execa('npm', ['publish', ...cliArgs, packagePath], {
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
  })
