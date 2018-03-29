// @flow
import { StartPlugin } from '@start/sequence/src/'

export default (...flowArgs: string[]) => {
  const flowCheck: StartPlugin = () => {
    const path = require('path')
    const execa = require('execa')

    const flowBinPath = path.resolve('node_modules/.bin/flow')

    return execa('node', [flowBinPath, 'check', ...flowArgs], {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: true,
      },
    }).catch(() => Promise.reject())
  }

  return flowCheck
}
