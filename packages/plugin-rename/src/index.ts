import plugin from '@start/plugin/src/'

export default (callback: (file: string) => string) => plugin('rename', async ({ files, log }) => {
  const { default: path } = await import('path')

  return files.map((file) => {
    const newPath = callback(file.path)

    if (file.path === newPath) {
      return file
    }

    log(newPath)

    if (file.map !== null) {
      return {
        path: newPath,
        data: file.data,
        map: {
          ...file.map,
          file: path.basename(newPath)
        }
      }
    }

    return {
      path: newPath,
      data: file.data,
      map: null
    }
  })
})
