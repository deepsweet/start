# 📦 plugin-lib-npm-publish

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-npm-publish.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-npm-publish) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-npm-publish&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-npm-publish)

Publish package to NPM.

## Install

```sh
$ yarn add --dev @start/plugin-lib-npm-publish
```

## Usage

### Signature

```ts
npmPublish(packagePath: string, options?: {})
```

#### `packagePath`

Relative path to package, `.` by default.

#### `options`

[NPM publish options](https://docs.npmjs.com/cli/publish)

Default:

```js
{
  registry: 'https://registry.npmjs.org/'
}
```

### Example

```js
import npmPublish from '@start/plugin-npm-plugin-lib-npm-publish'

export task = (packageName) => npmPublish(`packages/${packageName}`)
```
