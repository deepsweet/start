# ❓ plugin-assert

[![npm](https://img.shields.io/npm/v/@start/plugin-assert.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-assert) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-assert&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-assert)

Node.js [`assert()`](https://nodejs.org/docs/latest-v8.x/api/all.html#assert_assert_value_message).

## Install

```sh
$ yarn add --dev @start/plugin-assert
```

## Usage

### Signature

```ts
assert(arg: any, message?: string)
```

### Example

```js
export const task = (arg) => assert(arg, 'arg is required')
```
