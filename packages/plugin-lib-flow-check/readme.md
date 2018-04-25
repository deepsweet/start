# @start/plugin-lib-flow-check

Check types with [Flow](https://flow.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-flow-check
```

## Usage

### Signature

```ts
flowGenerate(outDirRelative: string, ...flowArgs: string[])
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import flowGenerate from '@start/plugin-lib-flow-generate'

export task = () =>
  sequence(
    find('src/**/*.js'),
    flowGenerate('build/')
  )
```
