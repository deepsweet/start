# start

[![npm](https://img.shields.io/npm/v/start.svg?style=flat-square)](https://www.npmjs.com/package/start)
[![linux build](https://img.shields.io/travis/start-runner/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/start)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/start)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/start/master.svg?style=flat-square)](https://codecov.io/github/start-runner/start)
[![deps](https://img.shields.io/gemnasium/start-runner/start.svg?style=flat-square)](https://gemnasium.com/start-runner/start)

<img src="logo.png" width="100" height="100" align="right" alt="logo"/>

* highly composable and modular
* shareable tasks presets
* Higher-Order Functions and Promises
* really [dead simple](lib/index.js)

## TOC

* [Install](#install)
* [Tasks](#tasks-file)
* [CLI](#cli)
  * [NPM scripts](#npm-scripts)
  * [Presets](#presets)
* [API](#api)
  * [Reporter](#reporter)
  * [Task](#task)
* [Advanced usage](#advanced-usage)
* [FAQ](#faq)
* [Copyrights](#copyrights)

## Install

```sh
npm i -S start
# or
yarn add start
```

## Tasks file

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
  istanbul.instrument(),
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

Each named export return a Promise – "tasks runner" – sequence of tasks managed by `start`, which will run them one by one passing data through until an error occurs. As you can see tasks runners can be nested in each other to achieve great reusability.

You can run it manually:

```js
build()
  .then((data) => {
    console.log('ok:', data);
  })
  .catch((error) => {
    console.error('not ok:', error);
  });
```

Or you can use an external CLI:

## CLI

```sh
npm i -D start-simple-cli
# or
yarn add --dev start-simple-cli
```

```
  Usage: index [options] <tasks runner> [arguments]

  Options:

    -h, --help              output usage information
    -f, --file, <file>      tasks file path, tasks.js by default
    -p, --preset, <preset>  tasks preset
```

Browse [available CLIs](https://www.npmjs.com/browse/keyword/start-cli).

### NPM scripts

For example for `tasks.js` listed above, transpiling with Babel:

```sh
npm i -D start-babel-cli
# or
yarn add --dev start-babel-cli
```

```js
// package.json
"scripts": {
  "start": "start-runner -f tasks.js"
}
```

And your available commands are:

```sh
npm start build
npm start dev
npm start lint
npm start test
npm start tdd
npm start coverage
npm start ci
# or
yarn start build
yarn start dev
yarn start lint
yarn start test
yarn start tdd
yarn start coverage
yarn start ci
```

See [NPM documentation](https://docs.npmjs.com/cli/start) for details.

### Presets

You can make your tasks file (and its dependencies!) completely external and shareable. Like a `start-my-es6-preset` package for a bunch of your similar projects. See [start-start-preset](https://github.com/start-runner/start-preset) as an example and browse [available presets](https://www.npmjs.com/browse/keyword/start-preset).

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

Reporter is an external function which prints the results of running tasks.

The simplest dummy reporter can be represented as following:

```js
export default (params) => (name, type, message) => {
  console.log(name, type, message);
};
```

#### `(params)`

First function call made by user. `params` can be options object, multiple arguments or whatever your reporter needs to be configured and initialized.

#### `(name, type, message)`

Second function call made by `start`:

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
  return function taskName(log, reporter) {
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

Tasks like [start-tape](https://github.com/start-runner/tape) relies on array of files paths. This can be provided by [start-files](https://github.com/start-runner/files):

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

Tasks like [start-babel](https://github.com/start-runner/babel) relies on files data and optional source maps. This can be provided by [start-read](https://github.com/start-runner/read) or other tasks which works with data:

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

And finally [start-write](https://github.com/start-runner/read) may output files data along with source maps:

```js
start(
  files('lib/**/*.js'),
  read(),
  babel({ sourceMaps: true }),
  write('build/')
)
```

#### `taskName(log, reporter)`

Third function call made by `start`.

* `taskName` – will be used as task name for logging
* `log` – function which is bound to `reporter(name, 'info')`, so if your task has something to say expect errors then you have to call `log` with message (or array of messages)
* `reporter` – original reporter, enables creating advanced tasks runners, see [start-concurrent](https://github.com/start-runner/concurrent) as an example

#### `require`

It's a good idea to "lazyload" your dependencies inside a task scope instead of requiring them at the very top. [Execution time can be a problem](https://github.com/gulpjs/gulp/issues/632), and there is no need to require all the heavy dependencies while cleaning a single directory (for example).

#### `return`

And finally, your task must return an ES6 Promise. It can be resolved with data which will be passed to the next Promise in chain, or rejected with some message (or array of messages).

Browse [available tasks](https://www.npmjs.com/browse/keyword/start-task).

## Advanced usage

### Pass arguments to tasks through CLI

```js
export const build = (arg1, arg2) => start(
  task1(arg1), // 'lib/**/*.js'
  task2(arg2) // 'hi'
);

```

```sh
npm start build 'lib/**/*.js' 'hi'
# or
yarn start build 'lib/**/*.js' 'hi'
```

### Pass arguments to nested tasks runners

```js
export const test = (arg) => start(
  task1(arg) // 'hi'
);

export const coverage = () => start(
  tas2k(),
  () => test('hi'),
  task3()
);

```

### Pass output data to nested tasks runners

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import inputConnector from 'start-input-connector';
import eslint from 'start-eslint';

const start = Start(reporter());

const lint = (input) => start(
  inputConnector(input),
  eslint()
);

export const lintLib = () => start(
  files([ 'lib/**/*.js' ]),
  lint
);

export const lintTest = () => start(
  files([ 'test/**/*.js' ]),
  lint
);
```

## FAQ

### Why do I need yet another tasks runner in 2k17 if I already have…

#### …Webpack?

Webpack is a "module bundler", not a tasks runner. Despite the fact that you may have some tricky tasks-plugins and can even lint files or clean folders with Webpack, in my opinion it's not a good idea. A great tool becomes a hulking "swiss-knife", in a bad way.

> Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new "features".

[Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy). So better let Webpack just to bundle modules, he knows how to do it well.

Also, you still need to somehow run Webpack itself. [start-webpack](https://github.com/start-runner/webpack) :) Start can't and shouldn't replace any kind of smart module bundlers. It's more a low-level abstraction, something like Makefile.

#### …NPM scripts?

I know, I know. You don't need any runners because NPM scripts can solve all the common tasks. I thought that too. But then I began to write more and more complex NPM scripts. And pre-scripts. And post-scripts. And scripts `like:that`. And still had a lot of `&&`. After that I began to worry about Windows, because I should be a good person, so I had to install `cross-env`. And `rimraf`. And `cli -i -s --tot ally -i n,c,o, -n=s -- istent`. Try to use `--long-but-understandable-after-2-months` options and your NPM script will be 2 screens width.

 `(╯°□°）╯︵ ┻━┻`.

You already know JavaScript, so use it. API over CLI just because it's cool.

#### …Grunt/Gulp?

It's more a matter of taste. And ["spirit of the age"](https://en.wikipedia.org/wiki/Zeitgeist). If you are totally fine with Grunt/Gulp then most likely there is no any need to change your workflow.

### Whoa! :scream_cat: What a great idea. I want more.

Sure :sunglasses:

* [webpack-blocks](https://github.com/andywer/webpack-blocks) for your Webpack config
* [recompose](https://github.com/acdlite/recompose) for your React components

## Copyrights

This software is released under the terms of the [MIT License](license.md).

The font used in logo is [supernova fat](http://www.ffonts.net/supernova-fat.font).
