# @start/plugin-xargs

Run task as parallel child processes for each argument.

## Install

```sh
$ yarn add --dev @start/plugin-xargs
```

## Usage

### Signature

```ts
xargs(taskName: string, options?: {}): (...args: string[])
```

#### `taskName`

Exported task name.

#### `options`

* `maxProcesses` – `Infinity` by default

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

export const task1 = (packageName) =>
  sequence(
    find(`${packageName}/src/**/*.js`),
    read,
    babel(babelConfig),
    write(`${packageName}/build/`)
  )

export const task2 => (...packageNames) = xargs('task1')(...packageNames)
// export const task2 = xargs('task1')
```
