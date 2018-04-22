# @start/plugin-lib-npm-version

Bump package version.

## Install

```sh
$ yarn add --dev @start/plugin-lib-npm-version
```

## Usage

```ts
npmVersion(version: string, options?: {
  packagePath?: string,
  message?: string,
  [key: string]: boolean | string
})
```

* `options` – [NPM version options](https://docs.npmjs.com/cli/version)

```js
import npmVersion from '@start/plugin-npm-plugin-lib-npm-version'

export task = (version) => npmVersion(version, { message: '📦 v%s' })
```
