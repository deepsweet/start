# :package: plugin-decompress

Decompress files to relative destination.

## Install

```sh
$ yarn add --dev @start/plugin-decompress
# or
$ npm install --save-dev @start/plugin-decompress
```

## Usage

### Signature 

```ts
decompress(outDirRelative: string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import decompress from '@start/plugin-decompress'

export const task = () =>
  sequence(
    find('resource/**/*.tar'),
    decompress('decompressed/')
  )
```
