# 🏭 plugin-lib-rollup

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-rollup.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-rollup) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-rollup&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-rollup)

Bundle files using [Rollup](https://rollupjs.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-rollup
# or
$ npm install --save-dev @start/plugin-lib-rollup
```

## Usage

### Signature

```ts
rollup(config: {})
```

#### `config`

[Rollup configuration](https://rollupjs.org/guide/en#configuration-files).

### Example

```js
import sequence from '@start/plugin-sequence'
import env from '@start/plugin-env'
import rollup from '@start/plugin-lib-rollup'

export const task = async () => {
  const { default: rollupConfig } = await import('./rollup.config')

  return sequence(
    env('NODE_ENV', 'production'),
    rollup(rollupConfig)
  )
}
```
