import plugin, { StartPlugin, StartMiddleware } from '@start/plugin/src/'

export default (middleware: StartMiddleware) =>
  (...plugins: StartPlugin[]) =>
    plugin('sequence', ({ files, ...props }) =>
      plugins.map(middleware).reduce(
        async (prev, next) => next.run({
          ...props,
          files: await prev
        }),
        Promise.resolve(files)
      )
    )
