# @start/plugin-spawn

Spawn new child process.

## Install

```sh
$ yarn add --dev @start/plugin-spawn
```

## Usage

### Signature

```ts
spawn(cli: string[], options?: {})
```

#### `cli`

Array of CLI command and args, for example `['node', '--version']`.

#### `options`

[execa options](https://github.com/sindresorhus/execa#options).

Default:

```js
{
  stdout: process.stdout,
  stderr: process.stderr,
  stripEof: false,
  env: {
    FORCE_COLOR: '1'
  }
}
```

If there is no `stderr` then error will be shown using Start reporter.

### Example

```js
import spawn from '@start/plugin-spawn'

export task = () => spawn(['node', '--version'])
```
