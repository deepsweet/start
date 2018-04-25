# @start/plugin-watch

Watch for new or changed files matched by glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-watch
```

## Usage

### Signature

```ts
watch(glob: string | string[], options?: {}): (target: StartPlugin)
```

#### `options`

[chokidar options](https://github.com/paulmillr/chokidar#api).

### Example

```js
import sequence from '@start/plugin-sequence'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'
import watch from '@start/plugin-watch'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task = () =>
  watch('src/**/*.js')(
    sequence(
      read,
      babel(babelConfig),
      write('build/')
    )
  )
```
