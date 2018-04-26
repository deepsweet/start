# 🏭 plugin-lib-typescript-generate

[![npm](https://img.shields.io/npm/v/@start/plugin-lib-typescript-generate.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-lib-typescript-generate) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin-lib-typescript-generate&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin-lib-typescript-generate)

Generate `.d.ts` files using [TypeScript](https://www.typescriptlang.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-typescript-generate
```

## Usage

### Signature

```ts
typescriptGenerate(outDir: string, options?: {})
```

#### `options`

[TypeScript Compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Default:

```js
{
  allowSyntheticDefaultImports: true,
  lib: 'esnext',
  moduleResolution: 'node'
}
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import typescriptGenerate from '@start/plugin-lib-typescript-generate'

export const task = () =>
  sequence(
    find('src/*.ts'),
    typescriptGenerate('build/')
  )
```
