import plugin from '@start/plugin/src/'

export default plugin('clean', async ({ files, logFile }) => {
  const { default: makethen } = await import('makethen')
  const { default: rimraf } = await import('rimraf')

  const rimrafP = makethen(rimraf)

  const options = {
    glob: false
  }

  return Promise.all(
    files.map((file) => {
      return rimrafP(file.path, options).then(() => {
        logFile(file.path)

        return file
      })
    })
  )
})
