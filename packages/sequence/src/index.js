// @flow

export type StartInput = {|
  path: string,
  data: ?string,
  map: ?{},
|}[]

export type StartPluginArg = {
  input: StartInput,
  taskName: string,
  [key: any]: any,
}

export type StartPlugin = (arg: StartPluginArg) => Promise<StartInput> | StartInput

export type StartReporter = (
  plugin: StartPlugin
) => (arg: StartPluginArg) => Promise<StartInput> | StartInput

const sequence = (reporter: StartReporter) => (...plugins: StartPlugin[]) => ({
  input = [],
  taskName,
}: StartPluginArg) =>
  plugins.map(reporter).reduce(
    async (current, next) =>
      next({
        input: await current,
        taskName,
      }),
    input
  )

export default sequence
