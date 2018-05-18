# ✅ plugin-lib-karma

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-karma.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-karma) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-karma&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-karma)

Run tests using [Karma](https://github.com/karma-runner/karma).

## Install

```sh
$ yarn add --dev @start/plugin-lib-karma
# or
$ npm install --save-dev @start/plugin-lib-karma
```

## Usage

### Signature

```ts
karma(config: {})
```

#### `config`

[Karma config](https://karma-runner.github.io/2.0/config/configuration-file.html).

### Example

```js
import karma from '@start/plugin-lib-karma'

export const task = () => karma({
  browsers: [ 'Chrome', 'Firefox' ],
  files: [
    'test/index.js'
  ],
  singleRun: true
})
```
