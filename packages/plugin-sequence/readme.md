# @start/plugin-sequence

Run plugins in sequence.

## Install

```sh
$ yarn add --dev @start/plugin-sequence
```

## Usage

### Signature

```ts
sequence(...plugins: StartPlugin[])
```

See [@start/plugin](https://github.com/deepsweet/start/tree/master/packages/plugin) for more details.

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
