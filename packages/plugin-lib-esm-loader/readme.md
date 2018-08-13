# 🏭 plugin-lib-esm-loader

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-esm-loader.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-esm-loader) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-esm-loader&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-esm-loader)

Copy a predefined [ESM loader](https://github.com/standard-things/esm) file to a directory.

## Install

```sh
$ yarn add --dev @start/plugin-lib-esm-loader
# or
$ npm install --save-dev @start/plugin-lib-esm-loader
```

## Usage

### Signature

```ts
esm(outDir: string, filename: string = 'esm-loader.js')
```

### Example

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "build/esm-loader.js",
  "module": "build/index.js",
  "dependencies": {
    "esm": "<X.Y.Z>"
  }
}
```

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'
import copyEsmLoader from '@start/plugin-lib-esm-loader'

const babelConfig = {
  // …
  babelrc: false,
  sourceMaps: true,
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      modules: false
    }]
  ]
}

export const task = () =>
  sequence(
    find('src/**/*.js'),
    read,
    babel(babelConfig),
    write('build/'),
    copyEsmLoader('build/')
  )
```
