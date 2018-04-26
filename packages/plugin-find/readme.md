# 🔍 plugin-find

[![npm](https://img.shields.io/npm/v/@start/plugin-find.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-find) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-find&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-find)

Find files using glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-find
```

## Usage

### Signature

```ts
find(glob: string | string[], options?: {})
```

#### `glob`

[minimatch patterns](https://github.com/isaacs/minimatch#usage).

#### `options`

[fast-glob options](https://github.com/mrmlnc/fast-glob#options-1).

Default:

```js
{
  ignore: ['node_modules/**']
}
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import copy from '@start/plugin-copy'

export const task = () =>
  sequence(
    find('src/**/*.json'),
    copy('build/')
  )
```
