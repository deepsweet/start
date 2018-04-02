import { StartPlugin } from '@start/plugin-sequence'

export default (callback: (file: string) => string) => {
  const rename: StartPlugin = async ({ input, log }) => {
    const { default: path } = await import('path')

    return input.map((file) => {
      const newPath = callback(file.path)

      if (file.path === newPath) {
        return file
      }

      log(newPath)

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
