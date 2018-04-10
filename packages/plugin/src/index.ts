export type StartFile = {
  path: string
  data: null | string
  map: null | {}
}

export type StartFiles = StartFile[]

export type StartPluginIn = {
  files: StartFiles,
  reporter: NodeJS.EventEmitter,
  logFile: (file: string) => void,
  logMessage: (message: string) => void
}

export type StartPluginOut = StartFiles | Promise<StartFiles>

export type StartPlugin = (props: StartPluginIn) => StartPluginOut

export default (name: string, plugin: StartPlugin): StartPlugin => async ({ reporter, ...props }) => {
  try {
    reporter.emit('start', name)

    const result = await plugin({
      ...props,
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
