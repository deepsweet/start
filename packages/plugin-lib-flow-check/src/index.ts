import plugin from '@start/plugin/src/'

export default (...flowArgs: string[]) =>
  plugin('flowCheck', () => async (props) => {
    const path = await import('path')
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

    try {
      await execa('node', [flowBinPath, 'check', ...flowArgs], spawnOptions)
    } catch (e) {
      throw null
    }

    return props
  })
