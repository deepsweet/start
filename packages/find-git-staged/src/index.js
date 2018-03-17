// @flow
import type { StartPlugin } from '@start/task/src/'

export default (glob: string | string[]) => {
  if (!glob) {
    throw new Error('Glob pattern is required')
  }

  const findGitStaged: StartPlugin = ({ logPath }) => {
    const { EOL } = require('os')
    const path = require('path')
    const execa = require('execa')
    const multimatch = require('multimatch')

    const gitArgs = ['diff', '--cached', '--name-only', '--diff-filter=ACM']

    return execa('git', gitArgs).then(({ stdout }) => {
      const gitFiles = stdout.split(EOL)
      const matchedFiles = multimatch(gitFiles, glob).map((file) => path.resolve(file))

      return matchedFiles.map((file) => {
        logPath(file)

        return {
          path: file,
        }
      })
    })
  }

  return findGitStaged
}
