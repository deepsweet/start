import plugin from '@start/plugin/src/'
import { Options } from 'rimraf'

type RimRaf = (path: string, options: Options, cb: (error: any) => void) => void

export default plugin('remove', async ({ files, logFile }) => {
  const { default: makethen } = await import('makethen')
  const { default: rimraf } = await import('rimraf')

  const rimrafP = makethen(rimraf as RimRaf)

  const options: Options = {
    glob: false
  }

  return {
    files: await Promise.all(
      files.map((file) => {
        return rimrafP(file.path, options).then(() => {
          logFile(file.path)

          return file
        })
      })
    )
  }
})
