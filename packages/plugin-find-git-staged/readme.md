# 🔍 plugin-find-git-staged

[![npm](https://img.shields.io/npm/v/@start/plugin-find-git-staged.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-find-git-staged) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-find-git-staged&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-find-git-staged)

Find Git staged files and filter them using glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-find-git-staged
# or
$ npm install --save-dev @start/plugin-find-git-staged
```

## Usage

### Signature

```ts
findGitStaged(glob: string | string[])
```

#### `glob`

[minimatch patterns](https://github.com/isaacs/minimatch#usage)

### Example

```js
import sequence from '@start/plugin-sequence'
import findGitStaged from '@start/plugin-find-git-staged'
import eslint from '@start/plugin-lib-eslint'

export const task = () =>
  sequence(
    findGitStaged('src/**/*.js'),
    eslint()
  )
```
