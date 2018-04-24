# @start/plugin-lib-typescript-check

## Install

```sh
$ yarn add --dev @start/plugin-lib-typescript-check
```

## Usage

### Signature

```ts
typescriptCheck(options?: {})
```

#### `options`

[TypeScript Compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Default:

```js
{
  allowSyntheticDefaultImports: true,
  lib: 'esnext',
  moduleResolution: 'node',
  pretty: true
}
```

### Example

```js
import typescriptCheck from '@start/plugin-lib-typescript-check'

export const task = () => typescriptCheck()
```
