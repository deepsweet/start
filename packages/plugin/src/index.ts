/* eslint-disable space-infix-ops */
export type MaybeObject = void | {}

export type StartReporter = NodeJS.EventEmitter

export type StartFile = {
  path: string,
  data?: string,
  map?: {}
}

export type StartDataFile = StartFile & {
  data: string
}

export type StartFilesProps = {
  files: StartFile[]
}

export type StartDataFilesProps = {
  files: StartDataFile[]
}

export type StartPluginUtils = {
  reporter: StartReporter,
  logPath: (path: string) => void,
  logMessage: (message: string) => void,
}

export type StartPluginCallback<P extends {}, R extends MaybeObject> = (utils: StartPluginUtils) => (props: P) => R | Promise<R>
export type StartPluginWrapper<P extends {}, R extends MaybeObject> = (reporter: StartReporter) => (inProps?: P) => Promise<R>
export type StartPlugin<P extends {}, R extends MaybeObject> = StartPluginWrapper<P, R> | Promise<StartPluginWrapper<P, R>>

export default <P extends {}, R extends MaybeObject> (name: string, pluginCallback: StartPluginCallback<P, R>): StartPlugin<P, R> => (reporter) => async (inProps?: P): Promise<R> => {
  try {
    reporter.emit('start', name)

    const outProps = await pluginCallback({
      reporter,
      logPath: (path) => reporter.emit('path', name, path),
      logMessage: (message) => reporter.emit('message', name, message)
    })(inProps as P)

    reporter.emit('done', name)

    return outProps
  } catch (error) {
    reporter.emit('error', name, error)

    throw null
  }
}
