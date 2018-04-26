# 👔 plugin-env

[![npm](https://img.shields.io/npm/v/@start/plugin-env.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-env) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-env&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-env)

Set environment variable using [`process.env`](https://nodejs.org/api/all.html#process_process_env).

## Install

```sh
$ yarn add --dev @start/plugin-env
# or
$ npm install --save-dev @start/plugin-env
```

## Usage

### Signature

```ts
env(key: string, value: string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import env from '@start/plugin-env'
import webpack from '@start/plugin-webpack'

import webpackConfig from './webpack-config'

export task = () =>
  sequence(
    env('NODE_ENV', 'production'),
    webpack(webpackConfig)
  )
```
