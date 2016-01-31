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

Start is all about functions, composition and chaining Promises.

```js
// tasks.js
import Start from 'start';
import logger from 'start-simple-logger';
import clean from 'start-clean';
import watch from 'start-watch';
import files from 'start-files';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
import eslint from 'start-eslint';
import mocha from 'start-mocha';
import { coverageInstrument, coverageReport } from 'start-coverage';

const start = Start(logger());

export function build() {
    return start(
        clean('build/'),
        files('lib/**/*.js'),
        read(),
        babel(),
        write('build/')
    );
}

export function dev() {
    return watch('lib/**/*.js')(file => {
        return start(
            files(file),
            read(),
            babel(),
            write('build/')
        );
    });
}

export function lint() {
    return start(
        eslint()
    );
}

export function test() {
    return start(
        eslint(),
        files('test/**/*.js'),
        mocha()
    );
}

export function coverage() {
    return start(
        clean('coverage/'),
        files('lib/**/*.js'),
        coverageInstrument(),
        files('test/**/*.js')
        mocha(),
        coverageReport([ 'html', 'text-summary' ])
    );
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks.js",
  "build": "npm run task build",
  "dev": "npm run task dev",
  "lint": "npm run task lint",
  "test": "npm run task test"
  "coverage": "npm run task coverage"
}
```

## Usage

`start(logger())(task(), task(), ...)`

Browse available [loggers](https://www.npmjs.com/browse/keyword/start-logger) and [tasks](https://www.npmjs.com/browse/keyword/start-tasks).

### Loggers

The simplest dummy logger can be represented as following:

```js
export default (params) => (data) => {
    console.log(data);
};
```

#### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your logger needs to be configured and initialized.

#### `(data)`

Second function calls made by tasks. `data` can be one of the following structures:

```js
{ type: 'global-start' }
{ name: 'beep', type: 'task-start' }
{ name: 'beep', type: 'info', message: undefined }
{ name: 'beep', type: 'info', message: 'ok' }
{ name: 'beep', type: 'info', message: [ 'ok', 'yeah' ] }
{ name: 'beep', type: 'task-resolve' }
{ name: 'beep', type: 'task-reject' }
{ type: 'global-resolve' }
{ type: 'global-reject' }
```

You are free to format and print it in a way you want to.

### Tasks

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

#### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your task needs to be configured and initialized.

#### `(input)`

Second function call made by Start with the result of previous task in chain. It's a good idea to pass the `input` data through if your task doesn't modify it.

There is some agreement: [start-files](https://github.com/start-runner/files) provides an array of found files paths as output data. [start-read](https://github.com/start-runner/read) provides an array of `{ path, data }` objects, which is further respected by [start-babel](https://github.com/start-runner/babel), [start-write](https://github.com/start-runner/write) and other tasks working with files data.

#### `taskName(log)`

Third function call made by Start. `taskName` will be used as task name for logging, and `log` is a function that "bound" to `logger({ name, type: 'info' })`, so all you need is to call it with message (or array of messages) like `log('beep')`.

#### `require`

It's a good idea to "lazyload" your dependencies inside a task scope instead of requiring them at the very top. [Execution time can be a problem](https://github.com/gulpjs/gulp/issues/632), and there is no need to require all the fat dependencies while cleaning a single directory (for example).

#### `return`

And finally, your task must return an ES6 Promise. It can be resolved with data which will be passed to the next Promise in chain, or rejected with some message (or array of messages).
