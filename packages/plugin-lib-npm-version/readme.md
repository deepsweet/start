# @start/plugin-lib-npm-version

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
