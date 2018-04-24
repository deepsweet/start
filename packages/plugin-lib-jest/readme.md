# @start/plugin-lib-jest

Run tests using [Jest](https://facebook.github.io/jest/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-jest
```

## Usage

### Signature

```ts
jest(options?: {})
```

#### `options`

[Jest CLI options](https://facebook.github.io/jest/docs/en/cli.html).

Default:

```js
{
  rootDir: process.cwd()
}
```

### Example

```js
import jest from '@start/plugin-lib-jest'

export task () => jest({
  moduleNameMapper: {
  '^~/(.*)$': '<rootDir>/src/$1'
  }
})
```
