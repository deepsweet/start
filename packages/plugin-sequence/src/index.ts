export type StartFile = {
  path: string
  data: null | string
  map: null | {}
}

export type StartInput = StartFile[]

export type StartPluginArg = {
  input: StartInput
  taskName: string
  log(string): void
}

export type StartPlugin = (arg: StartPluginArg) => StartInput | Promise<StartInput>

export type StartMiddleware = (plugin: StartPlugin) => StartPlugin

const sequence = (middleware: StartMiddleware) => (...plugins: StartPlugin[]): StartPlugin => ({
  input,
  ...rest
}) =>
  plugins.map(middleware).reduce(
    (prev, next) =>
      prev.then((output) =>
        next({
          ...rest,
          input: output,
        })
      ),
    Promise.resolve(input)
  )

export default sequence
