// @flow
import type { StartPlugin } from '@start/task/src/'

// https://docs.npmjs.com/cli/publish
export default (packagePath: string = '.', options?: {} = {}) => {
  const npmPublish: StartPlugin = ({ input }) => {
    const execa = require('execa')

    const cliOptions = Object.keys(options).reduce((result, key) => {
      return [...result, `--${key}=${options[key]}`]
    }, [])

    console.log(['publish', '--registry=https://registry.npmjs.org/', ...cliOptions, packagePath])
    return execa(
      'npm',
      ['publish', '--registry=https://registry.npmjs.org/', ...cliOptions, packagePath],
      {
        stdout: process.stdout,
        stderr: process.stderr,
        stripEof: false,
        env: {
          FORCE_COLOR: true,
        },
      }
    ).catch(() => Promise.reject())
  }

  return npmPublish
}
