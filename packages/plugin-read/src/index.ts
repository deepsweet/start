import plugin from '@start/plugin/src/'

export default plugin({
  name: 'read',
  run: (emit) => async ({ files }) => {
    const { default: makethen } = await import('makethen')
    const { default: gracefulFs } = await import('graceful-fs')

    const readFile = makethen(gracefulFs.readFile)

    return Promise.all(
      files.map((file) =>
        readFile(file.path, 'utf8').then((data) => {
          emit(file.path)

          return {
            ...file,
            data,
          }
        })
      )
    )
  }
})
