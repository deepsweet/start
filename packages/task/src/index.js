// @flow
import type EventEmitter from 'events'

export type StartInput = {|
  path: string,
  data: ?string,
  map: ?{},
|}[]

export type StartPluginArg = {|
  input: StartInput,
  taskName: string,
  logPath(path: string): void,
  logMessage(message: string): void,
|}

export type StartPlugin = (arg: StartPluginArg) => Promise<StartInput>

export type StartTaskArg = {|
  input?: StartInput,
  taskName: string,
|}

export type StartTask = (arg: StartTaskArg) => Promise<StartInput>

const task = (reporter: EventEmitter) => (...plugins: StartPlugin[]): StartTask => ({
  taskName,
  input = [],
}) => {
  reporter.emit('task:start', {
    taskName,
    plugins: plugins.map((plugin) => plugin.name),
  })

  return plugins
    .reduce((current, plugin) => {
      return current.then((output) => {
        reporter.emit('plugin:start', { taskName, pluginName: plugin.name })

        const logMessage = (message) => {
          reporter.emit('plugin:log:message', { taskName, pluginName: plugin.name, message })
        }
        const logPath = (message) => {
          reporter.emit('plugin:log:path', { taskName, pluginName: plugin.name, message })
        }

        // Promise.resolve()'d "sync" task errors and errors that are outside of Promise
        // need to be catched as well, but try-catch leads to duplication of reporter emits
        return new Promise((resolve, reject) => {
          plugin({
            input: output,
            logMessage,
            logPath,
            taskName,
          })
            .then(resolve)
            .catch(reject)
        })
          .then((result) => {
            reporter.emit('plugin:done', { taskName, pluginName: plugin.name })

            return result
          })
          .catch((error) => {
            reporter.emit('plugin:error', { taskName, pluginName: plugin.name, error })
            reporter.emit('task:error', { taskName })

            throw error
          })
      })
    }, Promise.resolve(input))
    .then((result) => {
      reporter.emit('task:done', { taskName })

      return result
    })
}

export default task
