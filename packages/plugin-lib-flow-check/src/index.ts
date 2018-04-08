import plugin from '@start/plugin'

export default (...flowArgs: string[]) =>
  plugin('flowCheck', async ({ files }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    const flowBinPath = path.resolve('node_modules/.bin/flow')

    const spawnOptions = {
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }

    return execa('node', [flowBinPath, 'check', ...flowArgs], spawnOptions)
      .then(() => files)
      .catch(() => Promise.reject(null))
  })
