# @start/plugin-assert

Node.js [`assert()`](https://nodejs.org/docs/latest-v8.x/api/all.html#assert_assert_value_message).

## Install

```sh
$ yarn add --dev @start/plugin-assert
```

## Usage

### Signature

```ts
assert(arg: any, message?: string)
```

### Example

```js
export const task = (arg) => assert(arg, 'arg is required')
```
