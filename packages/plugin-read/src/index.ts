import plugin from '@start/plugin/src/'

type ReadFile = (path: string, options: string, cb: (err: any, data: string) => void) => void

export default plugin('read', async ({ files, logFile }) => {
  const { default: makethen } = await import('makethen')
  const { default: gracefulFs } = await import('graceful-fs')

  const readFile = makethen(gracefulFs.readFile as ReadFile)

  return Promise.all(
    files.map((file) =>
      readFile(file.path, 'utf8').then((data) => {
        logFile(file.path)

        return {
          ...file,
          data
        }
      })
    )
  )
})
