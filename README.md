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
    return watch('lib/**/*.js')(function(file) {
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

`start(logger)(task, ...task)`

### Loggers

TODO

Browse [available loggers](https://www.npmjs.com/browse/keyword/start-logger).

### Tasks

TODO
