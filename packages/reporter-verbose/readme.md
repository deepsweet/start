# @start/reporter-verbose

Verbose "example" reporter.

## Install

```sh
$ yarn add --dev @start/reporter-verbose
```

## Usage

```ts
export default (taskName: string) => {
  const emitter = new EventEmitter()

  emitter.on('start', (pluginName: string) => {})
  emitter.on('message', (pluginName: string, message: string) => {})
  emitter.on('file', (pluginName: string, file: string) => {})
  emitter.on('done', (pluginName: string) => {})
  emitter.on('error', (pluginName: string, error: Error | string[] | string | null) => {})

  return emitter
}
```
