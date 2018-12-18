import plugin, { StartDataFile, StartFilesProps } from '@start/plugin/src/'

type ReadFile = (path: string, options: string, cb: (err: any, data: string) => void) => void

export default plugin('read', ({ logPath }) => async ({ files }: StartFilesProps) => {
  const { default: makethen } = await import('makethen')
  const gracefulFs = await import('graceful-fs')

  const readFile = makethen(gracefulFs.readFile as ReadFile)

  return {
    files: await Promise.all(
      files.map(async (file): Promise<StartDataFile> => {
        const data = await readFile(file.path, 'utf8')

        logPath(file.path)

        return {
          path: file.path,
          data
        }
      })
    )
  }
})
