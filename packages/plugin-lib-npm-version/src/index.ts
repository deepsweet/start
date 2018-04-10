import plugin from '@start/plugin/src/'

// https://docs.npmjs.com/cli/version
export default (version: string, packagePath: string = '.') =>
  plugin('npmVersion', async ({ files }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    return execa('npm', ['version', version], {
      cwd: path.resolve(packagePath),
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    })
      .then(() => files)
      .catch(() => Promise.reject(null))
  })
