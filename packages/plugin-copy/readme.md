# @start/plugin-copy

Copy files using streams and keeping folders structure.

## Install

```sh
$ yarn add --dev @start/plugin-copy
```

## Usage

### Signature

```ts
copy(outDirRelative: string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import copy from '@start/plugin-copy'

export const task = () =>
  sequence(
    find('src/**/*.json'),
    copy('build/')
  )
```
