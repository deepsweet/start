# @start/plugin-find

Find files using glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-find
```

## Usage

### Signature

```ts
find(glob: string | string[], options?: {})
```

#### `glob`

[minimatch patterns](https://github.com/isaacs/minimatch#usage).

#### `options`

[fast-glob options](https://github.com/mrmlnc/fast-glob#options-1).

Default:

```js
{
  ignore: ['node_modules/**']
}
```

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
