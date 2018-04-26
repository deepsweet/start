# 💯 plugin-lib-codecov

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-codecov.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-codecov) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-codecov&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-codecov)

Send code coverage report to [codecov.io](https://codecov.io/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-codecov
# or
$ npm install --save-dev @start/plugin-lib-codecov
```

## Usage

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import codecov from '@start/plugin-lib-codecov'

export task = () =>
  sequence(
    find('coverage/lcov.info'),
    read,
    codecov
  )
```
