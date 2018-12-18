import plugin, { StartDataFilesProps } from '@start/plugin/src/'

type WriteFile = (path: string, data: string, options: string, cb: (err: any) => void) => void

export default plugin('overwrite', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
  const { default: makethen } = await import('makethen')
  const gracefulFs = await import('graceful-fs')
  const writeFile = makethen(gracefulFs.writeFile as WriteFile)

  return {
    files: await Promise.all(
      files.map(async (file) => {
        await writeFile(file.path, file.data, 'utf8')

        logPath(file.path)

        return file
      })
    )
  }
})
