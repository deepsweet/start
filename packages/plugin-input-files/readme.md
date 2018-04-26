# 🔌 plugin-input-files

[![npm](https://img.shields.io/npm/v/@start/plugin-input-files.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-input-files) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-input-files&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-input-files)

Inject arguments as files into Start flow.

## Install

```sh
$ yarn add --dev @start/plugin-input-files
# or
$ npm install --save-dev @start/plugin-input-files
```

## Usage

### Signature

```ts
inputFiles(target: StartPlugin): (...files: string[])
```

### Example

```js
import inputFiles from '@start/plugin-input-files'
import eslint from '@start/plugin-lib-eslint'

export task = inputFiles(eslint())
```
