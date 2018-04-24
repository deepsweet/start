# @start/plugin-lib-npm-publish

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
