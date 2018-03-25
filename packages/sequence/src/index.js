// @flow

export type StartInput = {|
  path: string,
  data: ?string,
  map: ?{},
|}[]

export type StartPluginArg = {
  input: StartInput,
  taskName: string,
  [string]: any,
}

export type StartPlugin = (StartPluginArg) => Promise<StartInput> | StartInput

export type StartMiddleware = (StartPlugin) => (StartPluginArg) => Promise<StartInput> | StartInput

const sequence = (middleware: StartMiddleware) => (...plugins: StartPlugin[]) => ({
  input = [],
  taskName,
}: StartPluginArg) =>
  plugins.map(middleware).reduce(
    async (result, plugin) =>
      plugin({
        input: await result,
        taskName,
      }),
    input
  )

export default sequence
