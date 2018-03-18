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

export type StartPlugin = (arg: StartPluginArg) => Promise<StartInput> | StartInput

export type StartTaskArg = {|
  input?: StartInput,
  taskName: string,
|}

export type StartTask = (arg: StartTaskArg) => Promise<StartInput>

export type StartTaskRunner = (...args: any[]) => StartTask

const task = (reporter: EventEmitter) => (...plugins: StartPlugin[]): StartTask => async ({
  taskName,
  input = [],
}) => {
  reporter.emit('task:start', {
    taskName,
    plugins: plugins.map((plugin) => plugin.name),
  })

  const tasks = await plugins.reduce(async (current, plugin) => {
    const output = await current

    const logMessage = (message) => {
      reporter.emit('plugin:log:message', { taskName, pluginName: plugin.name, message })
    }
    const logPath = (message) => {
      reporter.emit('plugin:log:path', { taskName, pluginName: plugin.name, message })
    }

    reporter.emit('plugin:start', { taskName, pluginName: plugin.name })

    try {
      const result = await plugin({
        input: output,
        logMessage,
        logPath,
        taskName,
      })

      reporter.emit('plugin:done', { taskName, pluginName: plugin.name })

      return result
    } catch (error) {
      reporter.emit('plugin:error', { taskName, pluginName: plugin.name, error })
      reporter.emit('task:error', { taskName })

      throw error
    }
  }, input)

  reporter.emit('task:done', { taskName })

  return tasks
}

export default task
