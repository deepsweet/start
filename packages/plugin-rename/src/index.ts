import plugin from '@start/plugin/src/'

export default (callback: (file: string) => string) =>
  plugin('rename', async ({ files, logFile }) => {
    const path = await import('path')

    return {
      files: files.map((file) => {
        const newPath = callback(file.path)

        if (file.path === newPath) {
          return file
        }

        logFile(newPath)

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
    }
  })
