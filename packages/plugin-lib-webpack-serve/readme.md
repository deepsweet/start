# 🏭 plugin-lib-webpack-serve

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-webpack-serve.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-webpack-serve) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-webpack-serve&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-webpack-serve)

Run [Webpack development server](https://github.com/webpack-contrib/webpack-serve).

## Install

```sh
$ yarn add --dev @start/plugin-lib-webpack-serve
# or
$ npm install --save-dev @start/plugin-lib-webpack-serve
```

## Usage

### Signature

```ts
webpackServe(options: {})
```

#### `options`

[webpack-serve options](https://github.com/webpack-contrib/webpack-serve#serveoptions).

### Example

```js
import sequence from '@start/plugin-sequence'
import env from '@start/plugin-env'
import webpackServe from '@start/plugin-lib-webpack-serve'

export const task = () => {
  const { default: webpackConfig } = await import('./webpack.config')

  return sequence(
    env('NODE_ENV', 'development'),
    webpackServe({ config: webpackConfig('dev') })
  )
}
```
