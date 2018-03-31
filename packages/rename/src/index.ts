import { StartPlugin } from '@start/sequence'

export default (callback: (file: string) => string) => {
  const rename: StartPlugin = async ({ input, logPath }) => {
    const { default: path } = await import('path')

    return input.map((file) => {
      const newPath = callback(file.path)

      if (file.path === newPath) {
        return file
      }

      logPath(newPath)

      return {
        path: newPath,
        data: file.data,
        map: file.map
          ? {
              ...file.map,
              file: path.basename(newPath),
            }
          : null,
      }
    })
  }

  return rename
}
