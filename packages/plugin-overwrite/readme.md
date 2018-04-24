# @start/plugin-overwrite

Overwrite files.

## Install

```sh
$ yarn add --dev @start/plugin-overwrite
```

## Usage

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import eslint from '@start/plugin-lib-eslint'
import overwrite from '@start/plugin-overwrite'

export const task = () =>
  sequence(
    find('src/**/*.js'),
    eslint({ fix: true }),
    overwrite
  )
```
