# @start/plugin-remove

Remove files or directories.

## Install

```sh
$ yarn add --dev @start/plugin-remove
```

## Usage

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'

export const task = () =>
  sequence(
    find('build/'),
    remove,
  )
```
