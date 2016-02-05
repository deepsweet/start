[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![travis](http://img.shields.io/travis/start-runner/start.svg?style=flat-square)](https://travis-ci.org/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

Dead simple tasks runner. "Start" is all about functions, composition and chaining Promises.

## Install

```
npm i -S start
```

## Tasks file

```js
// tasks.js
import Start from 'start';
import logger from 'start-simple-logger';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import babel from 'start-babel';
import write from 'start-write';
import eslint from 'start-eslint';
import mocha from 'start-mocha';
import * as coverage from 'start-coverage';
import codecov from 'start-codecov';

import istanbul from 'babel-istanbul';

const start = Start(logger());

export function build() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        babel(),
        write('build/')
    );
}

export function dev() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        watch(file => start(
            files(file),
            babel(),
            write('build/')
        ))
    );
}

export function lint() {
    return start(
        files('**/*.js'),
        eslint()
    );
}

export function test() {
    return start(
        files('test/**/*.js'),
        mocha()
    );
}

export function tdd() {
    return start(
        files([ 'lib/**/*.js', 'test/**/*.js' ]),
        watch(test)
    );
}

export function cover() {
    return start(
        files('coverage/'),
        clean(),
        files('lib/**/*.js'),
        coverage.instrument(istanbul),
        test,
        coverage.report()
    );
}

export function travis() {
    return start(
        lint,
        cover,
        codecov()
    );
}
```

Each named export return a "tasks runner" – sequence of tasks managed by `start`, which will run them one by one passing data through until an error occurs. As you can see in the example above runners can be nested in each other to achieve great reusability.

Technically `start` is just a promises chain so you can put few runners in `Promise.all()` to get a parallel run for free.

## CLI

Tasks runners then can be called by CLI:

```
start <tasks file or moduleID to require> <tasks runner name>
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start ./tasks",
  "build": "npm run task build",
  "dev": "npm run task dev",
  "lint": "npm run task lint",
  "test": "npm run task test",
  "tdd": "npm run task tdd",
  "cover": "npm run task cover",
  "travis": "npm run task travis"
}
```

## Logger

Logger is an external function that print the results of running tasks.

The simplest dummy logger can be represented as following:

```js
export default (params) => (name, type, message) => {
    console.log(name, type, message);
};
```

### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your logger needs to be configured and initialized.

### `(name, type, message)`

Second function calls made by Start and tasks:

* `name` – task name
* `type` – log type:
  * `start`
  * `info` – must come with `message`
  * `resolve`
  * `error` – may come with `message`
* `message` – may be undefined, string, array of strings or instance of Error

See [start-simple-logger](https://github.com/start-runner/simple-logger) as an example or browse available [loggers](https://www.npmjs.com/browse/keyword/start-logger).

## Task

The simplest dummy task can be represented as following:

```js
export default (params) => (input) => {
    return function taskName(log) {
        const cats = require('cats-names');

        log(cats.random());

        return Promise.resolve(input);
    };
};
```

### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your task needs to be configured and initialized.

### `(input)`

Second function call made by Start with the result of previous task in chain. It's a good idea to pass the `input` data through if your task doesn't modify it.

[start-files](https://github.com/start-runner/files) provides an array of found files paths as output:

```js
[
    '/absolute/path/file1.js',
    '/absolute/path/file2.js'
]
```

[start-write](https://github.com/start-runner/write) is rely on array of `{ path, data }` objects as input:

```js
[
    {
      path: '/absolute/path/file1.js',
      data: '…'
    },
    {
      path: '/absolute/path/file2.js',
      data: '…'
    }
]
```

So every task between them should rely on the first structure and provide the second one.

### `taskName(log)`

Third function call made by Start. `taskName` will be used as task name for logging, and `log` is a function that bound to `logger(name, 'info')`, so all you need is to call it with message (or array of messages) like `log('beep')`.

### `require`

It's a good idea to "lazyload" your dependencies inside a task scope instead of requiring them at the very top. [Execution time can be a problem](https://github.com/gulpjs/gulp/issues/632), and there is no need to require all the heavy dependencies while cleaning a single directory (for example).

### `return`

And finally, your task must return an ES6 Promise. It can be resolved with data which will be passed to the next Promise in chain, or rejected with some message (or array of messages).

Browse available [tasks](https://www.npmjs.com/browse/keyword/start-tasks).
