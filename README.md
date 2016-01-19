[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![travis](http://img.shields.io/travis/start-runner/start.svg?style=flat-square)](https://travis-ci.org/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

Dead simple tasks runner.

## Install

```
npm i -S start
```

## Usage

Each task is Promise. That's all.

```
tasks/
├── beep.js
├── boop.js
└── index.js
```

```js
// tasks/beep.js
export function beep() {
    return new Promise((resolve, reject) => {
        resolve(':)');
    });
}
```

```js
// tasks/boop.js
export function boop() {
    return new Promise((resolve, reject) => {
        reject(':(');
    });
}
```

```js
// tasks/index.js
export { beep } from './beep';
export { boop } from './boop';

export const beepBoop = [
    exports.beep,
    exports.boop
];
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "beep": "npm run task beep",
  "boop": "npm run task boop",
  "beep-boop": "npm run task beepBoop"
}
```
