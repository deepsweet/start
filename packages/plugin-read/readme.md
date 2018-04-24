# @start/plugin-read

Read files content.

## Install

```sh
$ yarn add --dev @start/plugin-read
```

## Usage

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
