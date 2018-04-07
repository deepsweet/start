import plugin, { StartPlugin } from '@start/plugin/src/'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', ({ files, ...props }) =>
    plugins.reduce(
      async (prev, next) =>
        next.run({
          ...props,
          files: await prev
        }),
      Promise.resolve(files)
    )
  )
