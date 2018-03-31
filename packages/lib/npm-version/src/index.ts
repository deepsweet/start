import { StartPlugin } from '@start/sequence'

// https://docs.npmjs.com/cli/version
export default (version: string, packagePath: string = '.') => {
  const npmVersion: StartPlugin = async ({ input }) => {
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')

    return execa('npm', ['version', version], {
      cwd: path.resolve(packagePath),
      stdout: process.stdout,
      stderr: process.stderr,
      stripEof: false,
      env: {
        FORCE_COLOR: '1',
      },
    })
      .then(() => input)
      .catch(() => Promise.reject(null))
  }

  return npmVersion
}
