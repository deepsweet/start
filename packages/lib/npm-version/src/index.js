// @flow
import { StartPlugin } from '@start/sequence/src/'

// https://docs.npmjs.com/cli/version
export default (version: string, packagePath: string = '.') => {
  const npmVersion: StartPlugin = ({ input }) => {
    const path = require('path')
    const execa = require('execa')

    return execa('npm', ['version', version], {
      cwd: path.resolve(packagePath),
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
    }).catch(() => Promise.reject())
  }

  return npmVersion
}
