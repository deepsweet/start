# 🚷 plugin-lib-flow-check

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-flow-check.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-flow-check) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-flow-check&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-flow-check)

Check types using [Flow](https://flow.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-flow-check
```

## Usage

### Signature

```ts
flowGenerate(outDirRelative: string, ...flowArgs: string[])
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import flowGenerate from '@start/plugin-lib-flow-generate'

export task = () =>
  sequence(
    find('src/**/*.js'),
    flowGenerate('build/')
  )
```
