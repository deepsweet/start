# 🐣 plugin-spawn

[![npm](https://img.shields.io/npm/v/@start/plugin-spawn.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-spawn) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-spawn&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-spawn)

Spawn new child process.

## Install

```sh
$ yarn add --dev @start/plugin-spawn
# or
$ npm install --save-dev @start/plugin-spawn
```

## Usage

### Signature

```ts
spawn(cli: string[], options?: {})
```

#### `cli`

Array of CLI command and args, for example `['node', '--version']`.

#### `options`

[execa options](https://github.com/sindresorhus/execa#options).

Default:

```js
{
  stdout: process.stdout,
  stderr: process.stderr,
  stripEof: false,
  env: {
    FORCE_COLOR: '1'
  }
}
```

If there is no `stderr` then error will be shown using Start reporter.

### Example

```js
import spawn from '@start/plugin-spawn'

export task = () => spawn(['node', '--version'])
```
