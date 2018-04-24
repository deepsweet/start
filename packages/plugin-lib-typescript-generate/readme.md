# @start/plugin-lib-typescript-generate

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
