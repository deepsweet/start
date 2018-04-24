# @start/plugin-lib-webpack

Bundle files using [Webpack](https://webpack.js.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-webpack
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
