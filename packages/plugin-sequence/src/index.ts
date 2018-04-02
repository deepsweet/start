export type StartFile = {
  path: string
  data: null | string
  map: null | {}
}

export type StartInput = StartFile[]

export type StartPluginArg = {
  input: StartInput
  taskName: string
  log(message: string): void
}

export type StartPlugin = (arg: StartPluginArg) => StartInput | Promise<StartInput>

export type StartMiddleware = (plugin: StartPlugin) => StartPlugin

const sequence = (middleware: StartMiddleware) => (...plugins: StartPlugin[]): StartPlugin => ({
  input,
  ...rest
}) =>
  plugins.map(middleware).reduce(
    async (prev, next) =>
      next({
        ...rest,
        input: await prev,
      }),
    // TODO: TypeScript, why not just `input`?
    Promise.resolve(input)
  )

export default sequence
