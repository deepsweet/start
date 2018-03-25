// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (outDirRelative: string, ...flowArgs: string[]) => {
  const flowGenerate: StartPlugin = ({ input, logPath }) => {
    const path = require('path')
    const execa = require('execa')

    const outDir = path.resolve(outDirRelative)
    const flowBinPath = path.resolve('node_modules/.bin/flow')

    return Promise.all(
      input.map((file) =>
        execa(
          'node',
          [flowBinPath, 'gen-flow-files', file.path, '--out-dir', outDir, ...flowArgs],
          {
            stripEof: false,
            env: {
              FORCE_COLOR: true,
            },
          }
        ).then(() => {
          if (typeof logPath === 'function') {
            logPath(path.join(outDir, `${path.basename(file.path)}.flow`))
          }

          return file
        })
      )
    )
  }

  return flowGenerate
}
