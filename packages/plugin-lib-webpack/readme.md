# 🏭 plugin-lib-webpack

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-webpack.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-webpack) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-webpack&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-webpack)

Bundle files using [Webpack](https://webpack.js.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-webpack
# or
$ npm install --save-dev @start/plugin-lib-webpack
```

## Usage

### Signature

```ts
webpack(config: Configuration, statsOptions?: {})
```

#### `config`

[webpack configuration](https://webpack.js.org/configuration/).

#### `statsOptions`

[webpack stats options](https://webpack.js.org/configuration/stats/#stats).

Default:

```js
{
  colors: true
}
```

### Example

```js
import sequence from '@start/plugin-sequence'
import env from '@start/plugin-env'
import webpack from '@start/plugin-lib-webpack'

export const task = () => {
  const { default: webpackConfig } = await import('./webpack.config')

  return sequence(
    env('NODE_ENV', 'production'),
    webpack(webpackConfig('prod'))
  )
}
```
