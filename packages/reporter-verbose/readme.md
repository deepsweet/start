# 📃 reporter-verbose

[![npm](https://img.shields.io/npm/v/@start/reporter-verbose.svg?style=flat-square)](https://www.npmjs.com/package/@start/reporter-verbose) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/reporter-verbose&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/reporter-verbose)

Verbose reporter.

## Install

```sh
$ yarn add --dev @start/reporter-verbose
# or
$ npm install --save-dev @start/reporter-verbose
```

## Usage

### Example

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
