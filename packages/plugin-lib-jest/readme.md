# ✅ plugin-lib-jest

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-jest.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-jest) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-jest&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-jest)

Run tests using [Jest](https://facebook.github.io/jest/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-jest
```

## Usage

### Signature

```ts
jest(options?: {})
```

#### `options`

[Jest CLI options](https://facebook.github.io/jest/docs/en/cli.html).

Default:

```js
{
  rootDir: process.cwd()
}
```

### Example

```js
import jest from '@start/plugin-lib-jest'

export task () => jest({
  moduleNameMapper: {
  '^~/(.*)$': '<rootDir>/src/$1'
  }
})
```
