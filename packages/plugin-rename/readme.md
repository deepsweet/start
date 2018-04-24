# @start/plugin-rename

Rename files.

## Install

```sh
$ yarn add --dev @start/plugin-rename
```

## Usage

### Signature

```ts
rename(callback: (file: string) => string)
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import rename from '@start/plugin-rename'
import write from '@start/plugin-write'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task = () =>
  sequence(
    find('src/*.ts'),
    read,
    babel(babelConfig),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write('build/')
  )
```
