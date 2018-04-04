import EventEmitter from 'events'

export type StartFile = {
  path: string
  data: null | string
  map: null | {}
}

export type StartFiles = StartFile[]

export type StartPluginArg = {
  files: StartFiles,
  taskName: string,
}

export type StartEmit = (event: string, arg?: any) => void

export type StartOn = (event: string, callback: (arg?: any) => void) => void

export type StartPluginIn = {
  name?: string,
  run: (emit: StartEmit) => (arg: StartPluginArg) => StartFiles | Promise<StartFiles>
}

export type StartPluginOut = {
  on: StartOn,
  name?: string,
  run: (arg: StartPluginArg) => StartFiles | Promise<StartFiles>
}

export default (plugin: StartPluginIn): StartPluginOut => {
  const eventEmitter = new EventEmitter()
  const on = eventEmitter.on.bind(eventEmitter)

  return {
    ...plugin,
    on,
    run: async (arg) => {
      const id = { taskName: arg.taskName, pluginName: plugin.name }
      const emit = (message) => eventEmitter.emit('message', { ...id, message })

      eventEmitter.emit('start', id)

      try {
        const result = await plugin.run(emit)(arg)

        eventEmitter.emit('done', id)

        return result
      } catch (error) {
        eventEmitter.emit('error', { ...id, error })

        throw null
      }
    }
  }
}
