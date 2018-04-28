import plugin, { StartPlugin } from '@start/plugin/src/'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', ({ files, reporter }) =>
    plugins.reduce(
      async (prev, next) => {
        const nextRunner = await next

        return nextRunner({
          reporter,
          files: await prev
        })
      },
      Promise.resolve(files)
    )
  )
