# @start/plugin-parallel

Run tasks as parallel child processes with same agruments.

## Install

```sh
$ yarn add --dev @start/plugin-parallel
```

## Usage

### Signature

```ts
parallel(taskNames: string[], options?: {}): (...args: string[])
```

#### `taskNames`

Array of exported task names.

#### `options`

* `maxProcesses` – `Infinity` by default

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'
import parallel from '@start/plugin-parallel'

export const task1 = (...args) => {
  // …
}

export const task2 = (...args) => {
  // …
}

export const task3 = (...args) =>
  sequence(
    find('build/'),
    remove,
    parallel(['task1', 'task2'])(...args)
  )
```
