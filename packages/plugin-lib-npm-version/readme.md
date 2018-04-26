# 🔢 plugin-lib-npm-version

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-npm-version.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-npm-version) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-npm-version&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-npm-version)

Bump package version.

## Install

```sh
$ yarn add --dev @start/plugin-lib-npm-version
```

## Usage

### Signature

```ts
npmVersion(version: string, options?: {)
```

#### `version`

`<newversion> | major | minor | patch | premajor | premin
or | prepatch | prerelease | from-git`

#### `options`

[NPM version options](https://docs.npmjs.com/cli/version).

### Example

```js
import npmVersion from '@start/plugin-npm-plugin-lib-npm-version'

export task = (version) => npmVersion(version, { message: '📦 v%s' })
```
