# 🏭 plugin-lib-babel

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-babel.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-babel) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-babel&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-babel)

Transform files using [Babel](https://babeljs.io/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-babel
# or
$ npm install --save-dev @start/plugin-lib-babel
```

## Usage

### Signature

```ts
babel(options?: TransformOptions)
```

#### `options`

[Babel options](https://babeljs.io/docs/usage/api/#options).

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
  sourceMaps: true,
}

export const task = () =>
  sequence(
    find('src/**/*.js'),
    read,
    babel(babelConfig),
    write('build/')
  )
```
