import EventEmitter from 'events'

export type StartFile = {
  path: string
  data: null | string
  map: null | {}
}

export type StartFiles = StartFile[]

export type StartPluginIn = {
  files: StartFiles,
  taskName: string,
  log: (message: string) => void
}

export type StartPluginOut = StartFiles | Promise<StartFiles>

export type StartPluginRun = (props: StartPluginIn) => StartPluginOut

export type StartPlugin = {
  name: string,
  run: StartPluginRun
}

const noopLog = () => { }

export default (name: string, run: StartPluginRun): StartPlugin => ({
  name,
  run: ({ log = noopLog, ...props }) => run({ ...props, log })
})
