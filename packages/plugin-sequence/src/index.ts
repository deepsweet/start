import plugin, { StartPlugin } from '@start/plugin/src/'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', ({ files, reporter }) =>
    plugins.reduce(
      async (prev, next) =>
        (await next)({
          reporter,
          files: await prev
        }),
      Promise.resolve(files)
    )
  )
