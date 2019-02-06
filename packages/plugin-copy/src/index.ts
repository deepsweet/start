import plugin, { StartFilesProps } from '@start/plugin/src/'

export default (outDirRelative: string) =>
  plugin('copy', ({ logPath }) => async ({ files }: StartFilesProps) => {
    const path = await import('path')
    const { default: movePath } = await import('move-path')
    const { default: makeDir } = await import('make-dir')
    const { default: copie } = await import('copie')

    return {
      files: await Promise.all(
        files.map(async (file) => {
          const outFile = movePath(file.path, outDirRelative)
          const outDir = path.dirname(outFile)

          await makeDir(outDir)
          await copie(file.path, outFile)

          logPath(outFile)

          return file
        })
      )
    }
  })
