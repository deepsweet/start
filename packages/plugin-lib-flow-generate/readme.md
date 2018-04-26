# 🏭 plugin-lib-flow-generate

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-flow-generate.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-flow-generate) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-flow-generate&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-flow-generate)

Generate `.js.flow` files using [Flow](https://flow.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-flow-generate
```

## Usage

### Signature

```ts
flowCheck(...flowArgs: string[])
```

### Example

```js
import flowGenerate from '@start/plugin-lib-flow-generate'

export task = () => flowCheck()
```
