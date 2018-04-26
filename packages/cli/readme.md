# ⬛️ cli

[![npm](https://img.shields.io/npm/v/@start/cli.svg?style=flat-square)](https://www.npmjs.com/package/@start/cli) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/cli&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/cli)

CLI entry point to Start.

## Install

```sh
$ yarn add --dev @start/cli
# or
$ npm install --save-dev @start/cli
```

## Usage

### Example

```js
// package.json

"start": {
  // `./tasks.js` or `./tasks/index.js` by default if there is no `preset` option
  "file": "./my-tasks-file.js",
  // module name as a preset, overrides `file` option
  "preset": "my-awesome-start-preset",
  // modules to require before anything else, kinda `node -r`
  "require": [
    // module name
    "esm",
    // or a tuple with settings, just like in Babel
    [
      "@babel/register",
      {
        "extensions": [
          ".ts",
          ".js"
        ]
      }
    ]
  ],
  // reporter module name
  "reporter": "@start/reporter-verbose"
}
```

```sh
$ yarn start

One of the following task names is required:
* foo
* bar
* baz
```

```sh
$ yarn start foo
$ yarn start bar arg
$ yarn start baz arg1 arg2
```
