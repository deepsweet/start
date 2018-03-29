import { StartPlugin } from '@start/sequence/src/'

export default (...flowArgs: string[]) => {
  const flowCheck: StartPlugin = async ({ input }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    const flowBinPath = path.resolve('node_modules/.bin/flow')

    const spawnOptions = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
    }

    return execa('node', [flowBinPath, 'check', ...flowArgs], spawnOptions)
      .then(() => input)
      .catch(() => Promise.reject(null))
  }

  return flowCheck
}
