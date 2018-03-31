import { StartPlugin } from '@start/plugin-sequence'

const clean: StartPlugin = async ({ input, logPath }) => {
  const { default: makethen } = await import('makethen')
  const { default: rimraf } = await import('rimraf')

  const rimrafP = makethen(rimraf)

  const options = {
    glob: false,
  }

  return Promise.all(
    input.map((file) => {
      return rimrafP(file.path, options).then(() => {
        logPath(file.path)

        return file
      })
    })
  )
}

export default clean
