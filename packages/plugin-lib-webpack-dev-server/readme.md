# 🏭 plugin-lib-webpack-dev-server

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-webpack-dev-server.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-webpack-dev-server) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-webpack-dev-server&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-webpack-dev-server)

Run [Webpack development server](https://github.com/webpack/webpack-dev-server).

## Install

```sh
$ yarn add --dev @start/plugin-lib-webpack-dev-server
# or
$ npm install --save-dev @start/plugin-lib-webpack-dev-server
```

## Usage

### Signature

```ts
webpackServe(config: WebpackConfig, devServerConfig?: WebpackDevServerConfig)
```

#### `config`

[webpack config](https://webpack.js.org/configuration#options).

#### `devServerConfig`

[webpack `devServer` config](https://webpack.js.org/configuration/dev-server).

Default:

```js
{
  host: '127.0.0.1',
  port: 8080
}
```

### Example

```js
import sequence from '@start/plugin-sequence'
import env from '@start/plugin-env'
import webpackDevServer from '@start/plugin-lib-webpack-dev-server'

export const task = async () => {
  const { default: webpackDevConfig } = await import('./webpack.dev')

  return sequence(
    env({ NODE_ENV: 'development' }),
    webpackDevServer(
      webpackConfig,
      {
        hot: true,
        port: 3000
      }
    )
  )
}
```
