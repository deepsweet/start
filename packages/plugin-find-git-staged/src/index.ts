import plugin from '@start/plugin/src/'

export default (glob: string | string[]) =>
  plugin('findGitStaged', async ({ logFile }) => {
    const path = await import('path')
    const { EOL } = await import('os')
    const { default: execa } = await import('execa')
    const { default: multimatch } = await import('multimatch')

    const gitArgs = ['diff', '--cached', '--name-only', '--diff-filter=ACM']

    return execa('git', gitArgs).then(({ stdout }) => {
      const gitFiles = stdout.split(EOL)
      const matchedFiles = multimatch(gitFiles, glob)

      return matchedFiles
        .map((file) => path.resolve(file))
        .map((file) => {
          logFile(file)

          return {
            path: file,
            data: null,
            map: null
          }
        })
    })
  })
