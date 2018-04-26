# 🔂 plugin-xargs

[![npm](https://img.shields.io/npm/v/@start/plugin-xargs.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-xargs) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-xargs&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-xargs)

Run task as parallel child process for each argument.

## Install

```sh
$ yarn add --dev @start/plugin-xargs
# or
$ npm install --save-dev @start/plugin-xargs
```

## Usage

### Signature

```ts
xargs(taskName: string, options?: {}): (...args: string[])
```

#### `taskName`

Exported task name.

#### `options`

* `maxProcesses` – `Infinity` by default

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task1 = (packageName) =>
  sequence(
    find(`${packageName}/src/**/*.js`),
    read,
    babel(babelConfig),
    write(`${packageName}/build/`)
  )

export const task2 => (...packageNames) = xargs('task1')(...packageNames)
// export const task2 = xargs('task1')
```
