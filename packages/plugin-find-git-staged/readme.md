# @start/plugin-find-git-staged

Find Git staged files and filter them using glob patterns.

## Install

```sh
$ yarn add --dev @start/plugin-find-git-staged
```

## Usage

### Signature

```ts
findGitStaged(glob: string | string[])
```

#### `glob`

[minimatch patterns](https://github.com/isaacs/minimatch#usage)

### Example

```js
import sequence from '@start/plugin-sequence'
import findGitStaged from '@start/plugin-find-git-staged'
import eslint from '@start/plugin-lib-eslint'

export const task = () =>
  sequence(
    findGitStaged('src/**/*.js'),
    eslint()
  )
```
