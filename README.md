[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![travis](http://img.shields.io/travis/start-runner/start.svg?style=flat-square)](https://travis-ci.org/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

Dead simple tasks runner.

## Install

```
npm i -S start
```

## Overview

Everything is functions. That's all.

```
tasks/
├── beep.js
├── boop.js
└── index.js
```

```js
// tasks/beep.js
export default function(options) {
    return function beep(resolve, reject) {
        resolve(':)');
    }
}
```

```js
// tasks/boop.js
export default function(options) {
    return function boop(resolve, reject) {
        reject(':(');
    }
}
```

```js
// tasks/index.js
import start from 'start';
import logger from 'start-simple-logger';

import beep from './beep';
import boop from './boop';

export function beepBoop() {
    return start(logger)(
        beep(),
        boop()
    );
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "beep-boop": "npm run task beepBoop"
}
```

```
$ npm run beep-boop

[beep]: start
[beep]: :)
[beep]: done
[boop]: start
[boop]: :(
[boop]: error

$ echo $?

1
```

## Usage

`start(logger)(task, ...task)`

### Loggers

Logger is a function which can be called many times with different argument:

* `{ type: 'global-start' }`
* `{ name: 'beep', type: 'task-start' }`
* `{ name: 'beep', type: 'task-resolve', messages: undefined }`
* `{ name: 'beep', type: 'task-resolve', messages: 'ok' }`
* `{ name: 'beep', type: 'task-resolve', messages: [ 'ok', 'yeah' ] }`
* `{ name: 'beep', type: 'task-reject', messages: undefined }`
* `{ name: 'beep', type: 'task-reject', messages: 'no' }`
* `{ name: 'beep', type: 'task-reject', messages: [ 'oh', 'no' ] }`
* `{ type: 'global-resolve' }`
* `{ type: 'global-reject' }`

You are free to do what you want with this data.

Browse [available loggers](https://www.npmjs.com/browse/keyword/start-logger).

### Tasks

Task is a function which will be wrapped in ES6 Promise:

```js
export default function boop(resolve, reject) {
    reject(':(');
}
```

You are free to wrap your task in another function(s), for example to get an options:

```js
export default function(options) {
    return function beep(resolve) {
        resolve(':)');
    }
}
```

* you can only do two things: resolve or reject it
* message can be undefined, single string or array of strings
* function name will be used as task name
* useful common helpers:
  * [globby](https://github.com/sindresorhus/globby)

Browse [available tasks](https://www.npmjs.com/browse/keyword/start-task)
