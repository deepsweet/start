import { StartPlugin } from '@start/sequence/src/'

export default (glob: string | string[]) => {
  const findGitStaged: StartPlugin = async ({ logPath }) => {
    const { default: { EOL } } = await import('os')
    const { default: path } = await import('path')
    const { default: execa } = await import('execa')
    const { default: multimatch } = await import('multimatch')

    const gitArgs = ['diff', '--cached', '--name-only', '--diff-filter=ACM']

    return execa('git', gitArgs).then(({ stdout }) => {
      const gitFiles = stdout.split(EOL)
      const matchedFiles = multimatch(gitFiles, glob).map((file) => path.resolve(file))

      return matchedFiles.map((file) => {
        logPath(file)

        return {
          path: file,
          data: null,
          map: null,
        }
      })
    })
  }

  return findGitStaged
}
