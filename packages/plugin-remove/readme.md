# ❌ plugin-remove

[![npm](https://img.shields.io/npm/v/@start/plugin-remove.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-remove) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-remove&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-remove)

Remove files or directories.

## Install

```sh
$ yarn add --dev @start/plugin-remove
```

## Usage

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'

export const task = () =>
  sequence(
    find('build/'),
    remove,
  )
```
