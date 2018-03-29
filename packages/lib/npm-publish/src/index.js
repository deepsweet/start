// @flow
import { StartPlugin } from '@start/sequence/src/'

// https://docs.npmjs.com/cli/publish
export default (packagePath: string = '.', userOptions?: {}) => {
  const npmPublish: StartPlugin = ({ input }) => {
    const execa = require('execa')

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
        FORCE_COLOR: true,
      },
    }).catch(() => Promise.reject())
  }

  return npmPublish
}
