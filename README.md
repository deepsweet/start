[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![travis](http://img.shields.io/travis/start-runner/start.svg?style=flat-square)](https://travis-ci.org/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

Dead simple tasks runner. Browse [available tasks](https://www.npmjs.com/browse/keyword/start-task).

## Install

```
npm i -S start
```

## Usage

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
        resolve(':(');
    }
}
```

```js
// tasks/index.js
import start from 'start';

import beep from './beep';
import boop from './boop';

export function beepBoop() {
    return start(
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
