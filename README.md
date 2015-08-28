[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![travis](http://img.shields.io/travis/deepsweet/start.svg?style=flat-square)](https://travis-ci.org/deepsweet/start)
[![coverage](http://img.shields.io/coveralls/deepsweet/start/master.svg?style=flat-square)](https://coveralls.io/r/deepsweet/start)
[![deps](http://img.shields.io/david/deepsweet/start.svg?style=flat-square)](https://david-dm.org/deepsweet/start)

Dead simple tasks runner.

## Install

```
npm i -S start
```

## Usage

```
tasks/
├── foo.js
├── bar.js
└── index.js
```

```js
// tasks/foo.js
export function beep() {
    return new Promise((resolve, reject) => {
        resolve(':)');
    });
}
```

```js
// tasks/bar.js
export function boop() {
    return new Promise((resolve, reject) => {
        reject(':(');
    });
}
```

```js
// tasks/index.js
export { beep } from './foo';
export { boop } from './bar';

export const beepBoop = [
    exports.beep,
    exports.boop
];
```

```
babel-node ./node_modules/.bin/start tasks/ beep
babel-node ./node_modules/.bin/start tasks/ boop
babel-node ./node_modules/.bin/start tasks/ beepBoop
```
