import plugin from '@start/plugin'

export default plugin('clean', async ({ files, log }) => {
  const { default: makethen } = await import('makethen')
  const { default: rimraf } = await import('rimraf')

  const rimrafP = makethen(rimraf)

  const options = {
    glob: false
  }

  return Promise.all(
    files.map((file) => {
      return rimrafP(file.path, options).then(() => {
        log(file.path)

        return file
      })
    })
  )
})
