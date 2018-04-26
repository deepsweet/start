# ✅ plugin-lib-tape

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-tape.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-tape) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-tape&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-tape)

Run tests using [Tape](https://github.com/substack/tape).

## Install

```sh
$ yarn add --dev @start/plugin-lib-tape
```

## Usage

### Signature

```ts
tape(reporter?: () => NodeJS.ReadWriteStream)
```

#### `reporter`

[TAP compatible reporter](https://github.com/substack/tape#pretty-reporters).

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import tape from '@start/plugin-lib-tape'
import tapDiff from 'tap-diff'

export const task = () =>
  sequence(
    find('test/**/*.js'),
    tape(tapDiff)
  )
```
