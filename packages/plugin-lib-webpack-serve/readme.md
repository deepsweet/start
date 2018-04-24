# @start/plugin-lib-webpack-serve

Run [Webpack development server](https://github.com/webpack-contrib/webpack-serve).

## Install

```sh
$ yarn add --dev @start/plugin-lib-webpack-serve
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
