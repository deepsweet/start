# ⬛️ cli-lib

[![npm](https://img.shields.io/npm/v/@start/cli-lib.svg?style=flat-square)](https://www.npmjs.com/package/@start/cli-lib) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/cli&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/cli)

Core CLI lib.

## Install

```sh
$ yarn add --dev @start/cli-lib
# or
$ npm install --save-dev @start/cli-lib
```

## Usage

### Signature

```ts
cliLib(options: {
  file?: string,
  preset?: string,
  reporter?: string,
  taskName?: string,
  taskArgs?: string[]
})
```

### Example

```js
import cliLib from '@start/cli-lib'

cliLib({
  file: options.file,
  preset: options.preset,
  reporter: options.reporter,
  taskName: process.argv[2],
  taskArgs: process.argv.slice(3)
}).catch((error) => {
  if (error !== null) {
    console.log(error)
  }

  process.exit(1)
})
```
