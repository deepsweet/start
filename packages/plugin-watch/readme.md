# 👀 plugin-watch

[![npm](https://img.shields.io/npm/v/@start/plugin-watch.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-watch) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-watch&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-watch)

Watch for new or changed files matched by glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-watch
```

## Usage

### Signature

```ts
watch(glob: string | string[], options?: {}): (target: StartPlugin)
```

#### `options`

[chokidar options](https://github.com/paulmillr/chokidar#api).

### Example

```js
import sequence from '@start/plugin-sequence'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'
import watch from '@start/plugin-watch'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task = () =>
  watch('src/**/*.js')(
    sequence(
      read,
      babel(babelConfig),
      write('build/')
    )
  )
```
