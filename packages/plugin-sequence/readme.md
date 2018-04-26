# ⏩ plugin-sequence

[![npm](https://img.shields.io/npm/v/@start/plugin-sequence.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-sequence) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-sequence&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-sequence)

Run plugins in sequence.

## Install

```sh
$ yarn add --dev @start/plugin-sequence
# or
$ npm install --save-dev @start/plugin-sequence
```

## Usage

### Signature

```ts
sequence(...plugins: StartPlugin[])
```

See [@start/plugin](https://github.com/deepsweet/start/tree/master/packages/plugin) for more details.

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import copy from '@start/plugin-copy'

export const task = () =>
  sequence(
    find('src/**/*.json'),
    copy('build/')
  )
```
