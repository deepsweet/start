# 🏭 plugin-lib-postcss

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-postcss.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-postcss) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-postcss&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-postcss)

Transform files using [PostCSS](https://postcss.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-postcss
# or
$ npm install --save-dev @start/plugin-lib-postcss
```

## Usage

### Signature

```ts
postcss(options?: {})
```

#### `options`

* `plugins` – an array of [PostCSS plugins](https://github.com/postcss/postcss#plugins)
* `sourceMaps` – boolean whether to process source maps or not
* `parser`, `stringifier`, `syntax` – [PostCSS options](https://github.com/postcss/postcss#options)

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import postcss from '@start/plugin-lib-postcss'
import write from '@start/plugin-write'

import autoprefixer from 'autoprefixer'

export const task = () =>
  sequence(
    find('src/**/*.css'),
    read,
    postcss({
      plugins: [autoprefixer],
      sourceMaps: true
    }),
    write('build/')
  )
```
