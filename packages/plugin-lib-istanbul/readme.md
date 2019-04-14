# 💯 plugin-lib-istanbul

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-istanbul.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-istanbul) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-istanbul&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-istanbul)

Collect, report and check code coverage using [Istanbul](https://istanbul.js.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-istanbul
# or
$ npm install --save-dev @start/plugin-lib-istanbul
```

## Usage

### Signature

```ts
istanbulInstrument(options?: InstrumenterOptions, extensions?: string[])
```

#### `options`

[Istanbul instrumenter options](https://github.com/istanbuljs/istanbuljs/blob/9f8aebf1f08159df20358d77fe98c809d2027c5f/packages/istanbul-lib-instrument/src/instrumenter.js#L11-L42)

#### `extensions`

File extensions to instrument, for example `['.ts']`

```ts
istanbulReports(formats: string[] = ['lcovonly', 'text-summary'])
```

```ts
istanbulThresholds(options: {
  branches?: number,
  functions?: number,
  lines?: number,
  statements?: number
})
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '@start/plugin-lib-istanbul'
import tape from '@start/plugin-lib-tape'

export const task = () =>
  sequence(
    find('src/**/*.js'),
    istanbulInstrument({ esModules: true }),
    find('test/**/*.js'),
    tape(),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({ functions: 100 })
  )
```
