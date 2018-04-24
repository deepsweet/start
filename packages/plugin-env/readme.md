# @start/plugin-env

Set environment variable using [`process.env`](https://nodejs.org/api/all.html#process_process_env).

## Install

```sh
$ yarn add --dev @start/plugin-env
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
