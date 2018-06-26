import plugin from '@start/plugin/src/'

type ReadFile = (path: string, options: string, cb: (err: any, data: string) => void) => void

export default plugin('read', async ({ files, logFile }) => {
  const { default: makethen } = await import('makethen')
  const gracefulFs = await import('graceful-fs')

  const readFile = makethen(gracefulFs.readFile as ReadFile)

  return {
    files: await Promise.all(
      files.map(async (file) => {
        const data = await readFile(file.path, 'utf8')

        logFile(file.path)

        return {
          path: file.path,
          data,
          map: null
        }
      })
    )
  }
})
