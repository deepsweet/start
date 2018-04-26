# 🔀 plugin-parallel

[![npm](https://img.shields.io/npm/v/@start/plugin-parallel.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-parallel) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-parallel&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-parallel)

Run tasks as parallel child processes with same agruments.

## Install

```sh
$ yarn add --dev @start/plugin-parallel
```

## Usage

### Signature

```ts
parallel(taskNames: string[], options?: {}): (...args: string[])
```

#### `taskNames`

Array of exported task names.

#### `options`

* `maxProcesses` – `Infinity` by default

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'
import parallel from '@start/plugin-parallel'

export const buildCJS = (...args) => {
  // …
}

export const buildESM = (...args) => {
  // …
}

export const task = (...args) =>
  sequence(
    find('build/'),
    remove,
    parallel(['buildCJS', 'buildESM'])(...args)
  )
```
