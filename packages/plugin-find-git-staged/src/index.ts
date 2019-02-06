import plugin, { StartFile } from '@start/plugin/src/'

export default (glob: string | string[]) =>
  plugin('findGitStaged', ({ logPath }) => async () => {
    const path = await import('path')
    const { EOL } = await import('os')
    const { default: execa } = await import('execa')
    const { default: multimatch } = await import('multimatch')

    const gitArgs = ['diff', '--cached', '--name-only', '--diff-filter=ACM']
    const { stdout } = await execa('git', gitArgs)
    const gitFiles = stdout.split(EOL)
    const matchedFiles = multimatch(gitFiles, glob)

    return {
      files: matchedFiles
        .map((file) => path.resolve(file))
        .map((file): StartFile => {
          logPath(file)

          return {
            path: file
          }
        })
    }
  })
