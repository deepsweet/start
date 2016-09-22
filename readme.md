# start

[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![linux build](https://img.shields.io/travis/start-runner/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/start)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

<img src="logo.png" width="100" height="100" align="right" alt="logo"/>

* really [dead simple](lib/index.js)
* highly decomposed and modular
* flexible and functional
* powered by chaining Promises to control tasks flow

## Install

```
npm i -S start
```

## Tasks

```js
// tasks.js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import env from 'start-env';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
import eslint from 'start-eslint';
import mocha from 'start-mocha';
import * as istanbul from 'start-istanbul';
import codecov from 'start-codecov';

const start = Start(reporter());

export const build = () => start(
    env('NODE_ENV', 'production'),
    files('build/'),
    clean(),
    files('lib/**/*.js'),
    read(),
    babel(),
    write('build/')
);

export const dev = () => start(
    env('NODE_ENV', 'development'),
    files('build/'),
    clean(),
    files('lib/**/*.js'),
    watch((file) => start(
        files(file),
        read(),
        babel(),
        write('build/')
    ))
);

export const lint = () => start(
    files([ 'lib/**/*.js', 'test/**/*.js' ]),
    eslint()
);

export const test = () => start(
    env('NODE_ENV', 'test'),
    files('test/**/*.js'),
    mocha()
);

export tdd = () => start(
    files([ 'lib/**/*.js', 'test/**/*.js' ]),
    watch(test)
);

export coverage = () => start(
    env('NODE_ENV', 'test'),
    files('coverage/'),
    clean(),
    files('lib/**/*.js'),
    istanbul.instrument({ esModules: true }),
    test,
    istanbul.report()
);

export ci = () => start(
    lint,
    coverage,
    files('coverage/lcov.info'),
    read(),
    codecov()
);
```

Each named export return a "tasks runner" – sequence of tasks Promises managed by `start`, which will run them one by one passing data through until an error occurs.

As you can see in the example above runners can be nested in each other to achieve great reusability. Also, because `start` is just a Promise you can put few runners in `Promise.all()` to get a parallel run for free.

You can then call tasks runners manually:

```js
build()
    .then(data => {
        console.log('ok');
    })
    .catch(error => {
        console.log('not ok');
        process.exit(1);
    });
```

Or you can use an external CLI:

## CLI

```
npm i -D start-simple-cli
```

```
Usage: start-runner [options] <tasks runner>

Options:

  -h, --help              output usage information
  -f, --file, <file>      tasks file path, tasks.js by default
  -p, --preset, <preset>  tasks preset
```

Browse [available CLIs](https://www.npmjs.com/browse/keyword/start-cli).

### Handy NPM scripts

For example for `tasks.js` listed above, transpiling with Babel:

```
npm i -D start-babel-cli
```

```js
// package.json
"scripts": {
  "start": "start-runner -f tasks.js"
}
```

And your available commands are:

```
npm start build
npm start dev
npm start lint
npm start test
npm start tdd
npm start coverage
npm start ci
```

See [NPM documentation](https://docs.npmjs.com/cli/start) for details.

### Presets

You can make your tasks file (and its dependencies!) completely external and shareable. Like a `start-my-es6-preset` package for a bunch of your projects. See [start-start-preset](https://github.com/start-runner/start-preset) as an example and browse [available presets](https://www.npmjs.com/browse/keyword/start-preset).

```js
// package.json
"scripts": {
  "start": "start-runner -p start-my-es6-preset"
}
```

## API

```js
start(reporter())(
    task1(),
    task2(),
    ...
);
```

### Reporter

Reporter is an external function that print the results of running tasks.

The simplest dummy reporter can be represented as following:

```js
export default (params) => (name, type, message) => {
    console.log(name, type, message);
};
```

#### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your reporter needs to be configured and initialized.

#### `(name, type, message)`

Second function calls made by `start` and tasks:

* `name` – task name
* `type` – log type:
  * `start`
  * `info` – must come with `message`
  * `resolve`
  * `error` – may come with `message`
* `message` – may be undefined, string, array of strings or instance of Error

See [start-simple-reporter](https://github.com/start-runner/simple-reporter) as an example and browse [available reporters](https://www.npmjs.com/browse/keyword/start-reporter).

### Task

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

Second function call made by `start` with the result of previous task in chain. It's a good idea to pass the `input` data through if your task doesn't modify it.

Tasks like [start-tape](https://github.com/start-runner/tape) relies on array of files paths. This may be provided by [start-files](https://github.com/start-runner/files):

```js
start(
    files('tests/**/*.js'),
    tape()
)
```

`input`:

```js
[
    '/absolute/path/file1.js',
    '/absolute/path/file2.js'
]
```

Tasks like [start-babel](https://github.com/start-runner/babel) relies on files data and optional source maps. This may be provided by [start-read](https://github.com/start-runner/read) or other tasks which works with data:

```js
start(
    files('lib/**/*.js'),
    read(),
    babel()
)
```

`input`:

```js
[
    {
      path: '/absolute/path/file1.js',
      data: '…',
      map: '…'
    },
    {
      path: '/absolute/path/file2.js',
      data: '…',
      map: null
    }
]
```

And finally [start-write](https://github.com/start-runner/read) may output files data along with source maps (if present):

```js
start(
    files('lib/**/*.js'),
    read(),
    babel({ sourceMaps: true }),
    write('build/')
)
```

#### `taskName(log)`

Third function call made by `start`. `taskName` will be used as task name for logging, and `log` is a function that bound to `reporter(name, 'info')`. So if your task has something to say expect errors then you have to call `log` with message (or array of messages) like `log('beep')`.

#### `require`

It's a good idea to "lazyload" your dependencies inside a task scope instead of requiring them at the very top. [Execution time can be a problem](https://github.com/gulpjs/gulp/issues/632), and there is no need to require all the heavy dependencies while cleaning a single directory (for example).

#### `return`

And finally, your task must return an ES6 Promise. It can be resolved with data which will be passed to the next Promise in chain, or rejected with some message (or array of messages).

Browse [available tasks](https://www.npmjs.com/browse/keyword/start-task).

## Copyrights

This software is released under the terms of the [MIT License](license.md).

The font used in logo is [supernova fat](http://www.ffonts.net/supernova-fat.font).
