# 🗜 plugin-unpack

[![npm](https://img.shields.io/npm/v/@start/plugin-unpack.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-unpack) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-unpack&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-unpack)

🗜 Unpack .tar/.tar.bz2/.tar.gz/.zip archives archives.

## Install

```sh
$ yarn add --dev @start/plugin-unpack
# or
$ npm install --save-dev @start/plugin-unpack
```

## Usage

### Signature

```ts
unpack(outDir: string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import unpack from '@start/plugin-unpack'

export const task = () =>
  sequence(
    find('packed/*.tar'),
    unpack('unpacked/')
  )
```
