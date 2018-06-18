import plugin, { StartFile } from '@start/plugin/src/'

type Options = {
  [key: string]: any
}

export default (options?: Options) =>
  plugin('prettierEslint', async ({ files, logFile }) => {
    const { default: format } = await import('prettier-eslint')

    return {
      files: await Promise.all(
        files.map((file) =>
          new Promise<StartFile>((resolve, reject) => {
            const formatted: string = format({ ...options, filePath: file.path, text: file.data })

            if (file.data !== formatted) {
              logFile(file.path)
            }

            resolve({
              ...file,
              data: formatted
            })
          })
        )
      )
    }
  })
