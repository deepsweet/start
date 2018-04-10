import plugin from '@start/plugin/src/'

export default (outDirRelative: string, ...flowArgs: string[]) =>
  plugin('flowGenerate', async ({ files, logFile }) => {
    const { default: path } = require('path')
    const { default: execa } = require('execa')

    const outDir = path.resolve(outDirRelative)
    const flowBinPath = path.resolve('node_modules/.bin/flow')

    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }

    return Promise.all(
      files.map((file) =>
        execa(
          'node',
          [flowBinPath, 'gen-flow-files', file.path, '--out-dir', outDir, ...flowArgs],
          spawnOptions
        ).then(() => {
          logFile(path.join(outDir, `${path.basename(file.path)}.flow`))

          return file
        })
      )
    )
  })
