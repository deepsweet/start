import plugin, { StartPluginOut } from '@start/plugin/src/'

export type StartMiddleware = (plugin: StartPluginOut) => StartPluginOut

export default (reporter: StartMiddleware) => (...plugins: StartPluginOut[]) => reporter(plugin({
  name: 'sequence',
  run: () => ({ files, ...rest }) => plugins.map(reporter).reduce(
    async (prev, next) => next.run({
      ...rest,
      files: await prev
    }),
    Promise.resolve(files)
  )
}))
