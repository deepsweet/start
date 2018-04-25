# @start/plugin-write

Write files with source maps to relative destination keeping folders structure.

## Install

```sh
$ yarn add --dev @start/plugin-write
```

## Usage

### Signature

```ts
write(outDirRelative: string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task = () =>
  sequence(
    find('src/**/*.js'),
    read,
    babel(babelConfig),
    write('build/')
  )
```
