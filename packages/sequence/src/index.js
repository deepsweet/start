// @flow

export type StartInput = {|
  path: string,
  data: ?string,
  map: ?{},
|}[]

export type StartPluginArg = {
  input: StartInput,
  taskName: string,
  logMessage(string): void,
  logPath(string): void,
}

export type StartPlugin = (StartPluginArg) => Promise<StartInput> | StartInput

export type StartMiddleware = (StartPlugin) => StartPlugin

const sequence = (middleware: StartMiddleware) => (...plugins: StartPlugin[]) => ({
  input = [],
  ...rest
}: StartPluginArg) =>
  plugins.map(middleware).reduce(
    async (result, plugin) =>
      plugin({
        ...rest,
        input: await result,
      }),
    input
  )

export default sequence
