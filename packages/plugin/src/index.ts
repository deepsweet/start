export type StartFile = {
  path: string,
  data: null | string,
  map: null | {}
}

export type StartFiles = StartFile[]

export type StartPluginPropsIn = {
  files?: StartFiles,
  logFile?: (file: string) => void,
  logMessage?: (message: string) => void,
  reporter: NodeJS.EventEmitter,
  [key: string]: any
}

export type StartPluginPropsOut = {
  [key: string]: any
}

export type StartPlugin = (props: StartPluginPropsIn) => StartPluginPropsOut | Promise<StartPluginPropsOut> | void

export default (name: string, pluginFn: StartPlugin): StartPlugin => async ({ reporter, ...rest }) => {
  try {
    reporter.emit('start', name)

    const result = await pluginFn({
      ...rest,
      reporter,
      logFile: (file) => reporter.emit('file', name, file),
      logMessage: (message) => reporter.emit('message', name, message)
    })

    reporter.emit('done', name)

    return result
  } catch (error) {
    reporter.emit('error', name, error)

    throw null
  }
}
