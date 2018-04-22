# @start/plugin-lib-npm-publish

Publish package to NPM.

## Install

```sh
$ yarn add --dev @start/plugin-lib-npm-publish
```

## Usage

```ts
npmPublish(packagePath: string = '.', options?: {
  registry?: string,
  otp?: string,
  [key: string]: boolean | string
})
```

* `options` – [NPM publish options](https://docs.npmjs.com/cli/publish)

```js
import npmPublish from '@start/plugin-npm-plugin-lib-npm-publish'

export task = (packageName) => npmPublish(`packages/${packageName}`)
```
