export type StartInput = {
  path: string
  data: null | string
  map: null | {}
}[]

export type StartPluginArg = {
  input: StartInput
  taskName: string
  logMessage(string): void
  logPath(string): void
}

export type StartPlugin = (arg: StartPluginArg) => StartInput | Promise<StartInput>

export type StartMiddleware = (plugin: StartPlugin) => StartPlugin

const sequence = (middleware: StartMiddleware) => (...plugins: StartPlugin[]): StartPlugin => ({
  input,
  ...rest
}) =>
  plugins.map(middleware).reduce(
    async (result, plugin) =>
      plugin({
        ...rest,
        input: await result,
      }),
    input
  )

export default sequence
