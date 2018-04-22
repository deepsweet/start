# @start/plugin-lib-prettier-eslint

Fix code(style) using [Prettier + ESLint](https://github.com/prettier/prettier-eslint).

## Install

```sh
$ yarn add --dev @start/plugin-lib-prettier-eslint
```

## Usage

```ts
prettierEslint(options?: {})
```

* `options` – [prettier-eslint options](https://github.com/prettier/prettier-eslint#options)

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import prettierEslint from '@start/plugin-lib-prettier-eslint'
import overwrite from '@start/plugin-overwrite'

export const task = () =>
  sequence(
    find('src/*.js'),
    read,
    prettierEslint(),
    overwrite
  )
```
