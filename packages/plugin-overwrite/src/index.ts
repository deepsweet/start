import plugin from '@start/plugin/src/'

type WriteFile = (path: string, data: string, options: string, cb: (err: any) => void) => void

export default plugin('overwrite', async ({ files, logFile }) => {
  const { default: makethen } = await import('makethen')
  const { default: gracefulFs } = await import('graceful-fs')
  const writeFile = makethen(gracefulFs.writeFile as WriteFile)

  return Promise.all(
    files.map((file) =>
      writeFile(file.path, file.data, 'utf8').then(() => {
        logFile(file.path)

        return file
      })
    )
  )
})
