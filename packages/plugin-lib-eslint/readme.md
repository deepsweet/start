# 🚷 plugin-lib-eslint

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-eslint.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-eslint) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-eslint&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-eslint)

Lint and/or fix code using [ESLint](https://eslint.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-eslint
# or
$ npm install --save-dev @start/plugin-lib-eslint
```

## Usage

### Signature

```ts
eslint(options?: {}, formatter?: string)
```

#### `options`

[ESLint CLIEngine options](https://eslint.org/docs/developer-guide/nodejs-api#cliengine).

Default:

```js
{
  cache: true,
  cacheLocation: 'node_modules/.cache/eslint'
}
```

#### `formatter`

[ESLint formatter](https://eslint.org/docs/developer-guide/nodejs-api#clienginegetformatter).

### Example

```js
import sequence from '@start/plugin-sequence'
import findGitStaged from '@start/plugin-find-git-staged'
import read from '@start/plugin-read'
import eslint from '@start/plugin-lib-eslint'

export const task = () =>
  sequence(
    findGitStaged('src/**/*.js'),
    read,
    eslint({
      rules: {
        'no-undef': 'error'
      }
    })
  )
```

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import eslint from '@start/plugin-lib-eslint'
import overwrite from '@start/plugin-overwrite'

export const task = () =>
  sequence(
    find('src/**/*.js'),
    read,
    eslint({ fix: true }),
    overwrite
  )
```
