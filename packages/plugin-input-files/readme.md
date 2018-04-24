# @start/plugin-input-files

Inject arguments as files into Start flow.

## Install

```sh
$ yarn add --dev @start/plugin-input-files
```

## Usage

### Signature

```ts
inputFiles(target: StartPlugin): (...files: string[])
```

### Example

```js
import inputFiles from '@start/plugin-input-files'
import eslint from '@start/plugin-lib-eslint'

export task = inputFiles(eslint())
```
