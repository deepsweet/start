# @start/plugin-assert

Node.js [`assert()`](https://nodejs.org/docs/latest-v8.x/api/all.html#assert_assert_value_message).

## Install

```sh
$ yarn add --dev @start/plugin-assert
```

## Usage

```ts
assert(arg: any, message?: string)
```

```js
export const task = (arg) => assert(arg, 'arg is required')
```
