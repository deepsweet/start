import plugin, { StartFile, StartFilesProps } from '@start/plugin/src/'

type Options = {
  [key: string]: any
}

export default (options?: Options) =>
  plugin('prettierEslint', ({ logPath }) => async ({ files }: StartFilesProps) => {
    // @ts-ignore
    const { default: format } = await import('prettier-eslint')

    return {
      files: await Promise.all(
        files.map((file) =>
          new Promise<StartFile>((resolve, reject) => {
            const formatted: string = format({ ...options, filePath: file.path, text: file.data })

            if (file.data !== formatted) {
              logPath(file.path)
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
