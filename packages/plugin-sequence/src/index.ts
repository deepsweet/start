import plugin, { StartPlugin } from '@start/plugin'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', ({ files, ...props }) =>
    plugins.reduce(
      async (prev, next) =>
        next({
          ...props,
          files: await prev
        }),
      Promise.resolve(files)
    )
  )
