export type StartFile = {
  path: string,
  data: null | string,
  map: null | {}
}

export type StartPluginFnProps = {
  files: StartFile[],
  reporter: NodeJS.EventEmitter,
  logFile: (file: string) => void,
  logMessage: (message: string) => void,
  [key: string]: any
}

export type StartPluginProps = {
  files: StartFile[],
  reporter?: NodeJS.EventEmitter,
  [key: string]: any
}

export type StartPluginFn = (props: StartPluginFnProps) => StartPluginProps | Promise<StartPluginProps>

export type StartPlugin = StartPluginFn | Promise<StartPluginFn>

export default (name: string, pluginFn: StartPluginFn): StartPluginFn => async ({ files, reporter, ...rest }) => {
  try {
    reporter.emit('start', name)

    const result = await pluginFn({
      files,
      reporter,
      ...rest,
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
