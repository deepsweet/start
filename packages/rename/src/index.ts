import { StartPlugin } from '@start/sequence/src/'

export default (callback: (file: string) => string) => {
  const rename: StartPlugin = async ({ input, logPath }) => {
    const { default: path } = await import('path')

    return input.map((file) => {
      const newPath = callback(file.path)

      if (file.path === newPath) {
        return file
      }

      logPath(newPath)

      if (file.map) {
        // TODO: why not?
        // file.map.file = path.basename(newPath)
        file.map = {
          ...file.map,
          file: path.basename(newPath),
        }
      }

      return {
        path: newPath,
        data: file.data,
        map: file.map,
      }
    })
  }

  return rename
}
