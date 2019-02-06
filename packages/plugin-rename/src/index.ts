import plugin, { StartDataFile, StartDataFilesProps } from '@start/plugin/src/'

export default (callback: (file: string) => string) =>
  plugin('rename', ({ logPath }) => async ({ files }: StartDataFilesProps) => {
    const path = await import('path')

    return {
      files: files.map((file): StartDataFile => {
        const newPath = callback(file.path)

        if (file.path === newPath) {
          return file
        }

        logPath(newPath)

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
          data: file.data
        }
      })
    }
  })
