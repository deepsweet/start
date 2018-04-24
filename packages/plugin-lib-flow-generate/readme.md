# @start/plugin-lib-flow-generate

Generate `.js.flow` with [Flow](https://flow.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-flow-generate
```

## Usage

### Signature

```ts
flowCheck(...flowArgs: string[])
```

### Example

```js
import flowGenerate from '@start/plugin-lib-flow-generate'

export task = () => flowCheck()
```
