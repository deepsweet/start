# start

[![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start)

<img src="logo.svg" width="110" height="110" align="right" alt="logo"/>

* functional – in all senses
* fast – [parallelism and concurrency](https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism)
* shareable – presets as published packages
* 4th line to align with logo on the right

## TOC

* [Example](#example)
* [How to](#how-to)
* [Recipes](#recipes)
* [Packages](#packages)
  * [Core](#core)
  * [Plugins](#plugins)
    * [FS](#fs)
    * [Build and bundle](#build-and-bundle)
    * [Tests](#tests)
    * [Lint, check and fix](#lint-check-and-fix)
    * [CI and publish](#ci-and-publish)
  * [Tasks](#tasks)
* [Roadmap](#roadmap)
* [Copyright](#copyright)

## Example

```
.
├── packages/
│   ├── foo/
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── test/
│   │   │   └── index.ts
│   │   └── package.json
│   └── bar/
│       ├── src/
│       │   └── index.ts
│       ├── test/
│       │   └── index.ts
│       └── package.json
├── package.json
└── tasks.ts
```

```sh
$ yarn add --dev --ignore-workspace-root-check \
  @babel/core \
  @babel/register \
  @babel/preset-env \
  @babel/preset-typescript \
  @start/cli \
  @start/reporter-verbose \
  @start/plugin-sequence \
  @start/plugin-parallel \
  @start/plugin-xargs \
  @start/plugin-find \
  @start/plugin-find-git-staged \
  @start/plugin-remove \
  @start/plugin-read \
  @start/plugin-rename \
  @start/plugin-write \
  @start/plugin-lib-babel \
  @start/plugin-lib-typescript-generate \
  @start/plugin-lib-eslint \
  @start/plugin-lib-istanbul \
  @start/plugin-lib-tape \
  @start/plugin-lib-codecov
```

```js
// package.json

{
  "private": true,
  "description": "Start example",
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {},
  "start": {
    // tasks file, default to `./tasks`
    "file": "./tasks"
    "require": [
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
    "reporter": "@start/reporter-verbose"
  },
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          },
          // "Tomorrow's ECMAScript modules today"
          // @start/cli includes https://github.com/standard-things/esm by default
          "modules": false
        }
      ],
      // Babel 7
      "@babel/preset-typescript"
    ]
  }
}
```

```ts
// tasks.ts

// write tasks file once, publish it and then reuse or even extend
// in all projects using `start.preset` option in `package.json`,
// something like `my-start-preset` package with everything included

import sequence from '@start/plugin-sequence'
import parallel from '@start/plugin-parallel'
import xargs from '@start/plugin-xargs'
import find from '@start/plugin-find'
import findGitStaged from '@start/plugin-find-git-staged'
import remove from '@start/plugin-remove'
import read from '@start/plugin-read'
import rename from '@start/plugin-rename'
import write from '@start/plugin-write'
import babel from '@start/plugin-lib-babel'
import typescriptGenerate from '@start/plugin-lib-typescript-generate'
import eslint from '@start/plugin-lib-eslint'
import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '@start/plugin-lib-istanbul'
import tape from '@start/plugin-lib-tape'
import codecov from '@start/plugin-lib-codecov'

const babelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6
        },
        modules: false
      }
    ],
    '@babel/preset-typescript'
  ]
}

// each named export is a "task"
export const build = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/**/*.ts`),
    read,
    babel(babelConfig),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write(`packages/${packageName}/build/`)
  )

export const dts = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/**/*.ts`),
    typescriptGenerate(`packages/${packageName}/build/`)
  )

export const pack = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/build/`),
    remove,
    // child-processes
    parallel(['build', 'dts'])(packageName)
  )

// child processes
export const packs = xargs('pack')

export const dev = (packageName: string) =>
  watch(`packages/${packageName}/**/*.ts`)(
    build(packageName)
  )

export const lint = () =>
  sequence(
    findGitStaged(['packages/*/{src,test}/**/*.ts']),
    read,
    eslint()
  )

export const lintAll = () =>
  sequence(
    find(['packages/*/{src,test}/**/*.ts']),
    read,
    eslint()
  )

export const test = () =>
  sequence(
    find('coverage/'),
    remove,
    find('packages/*/src/**/*.ts'),
    istanbulInstrument({ esModules: true, extensions: ['.ts'] }),
    find('packages/*/test/**/*.ts'),
    tape(),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({ functions: 100 })
  )

export const ci = () =>
  sequence(
    // nested task
    lintAll(),
    // nested task
    test(),
    find('coverage/lcov.info'),
    read,
    codecov
  )
```

```sh
$ yarn start
# or
$ npx start

One of the following task names is required:
* build
* dts
* pack
* packs
* dev
* lint
* lintAll
* test
* ci
```

```sh
$ yarn start build foo
$ yarn start dts foo
$ yarn start pack foo
$ yarn start packs foo bar
$ yarn start dev bar
$ yarn start lint
$ yarn start lintAll
$ yarn start test
$ yarn start ci
```

## How to

* [Use CLI and pass in options](packages/cli)
* [Create a plugin](packages/plugin)
* [Create a reporter](packages/reporter-verbose)
* [Create a preset](https://github.com/deepsweet/start-preset-node-ts-lib)

## Recipes

* Node.js TypeScript library preset – [@deepsweet/start-preset-node-ts-lib](https://github.com/deepsweet/start-preset-node-ts-lib)
* Node.js TypeScript libraries monorepo – Start project builds itself from sources using sources, see [`tasks/index.ts`](tasks/index.ts)
* React / React Native (higher-order) components monorepo – [hocs](https://github.com/deepsweet/hocs)
* React app – to be added

## Packages

### Core

* ⬛️ [cli](packages/cli) – CLI entry point
* ⚙️ [plugin](packages/plugin) – plugin creator
* 📃 [reporter-verbose](packages/reporter-verbose) – verbose reporter

### Plugins

#### Misc

* ⏩ [plugin-sequence](packages/plugin-sequence) – run plugins in sequence
* 🔀 [plugin-parallel](packages/plugin-parallel) – run tasks as parallel child processes with same agruments
* 🔂 [plugin-xargs](packages/plugin-xargs) – run task as parallel child process for each argument
* 🐣 [plugin-spawn](packages/plugin-spawn) – spawn new child process
* 👔 [plugin-env](packages/plugin-env) – set environment variable using [`process.env`](https://nodejs.org/api/all.html#process_process_env)
* 🔌 [plugin-input-files](packages/plugin-input-files) – inject arguments as files into Start flow files
* 🔌 plugin-output-files – to be added

#### FS

* 🔍 [plugin-find](packages/plugin-find) – find files using glob patterns
* 🔍 [plugin-find-git-staged](packages/plugin-find-git-staged) – find Git staged files and filter them using glob patterns
* 📖 [plugin-read](packages/plugin-read) – read files content
* 🔠 [plugin-rename](packages/plgun-rename) – rename files
* ❌ [plugin-remove](packages/plugin-remove) – remove files or directories
* 👯 [plugin-copy](packages/plugin-copy) – copy files to relative destination using streams and keeping folders structure
* ✏️ [plugin-write](packages/plugin-write) – write files with source maps to relative destination keeping folders structure
* ✏️ [plugin-overwrite](packages/plugin-overwrite) – overwrite files
* 👀 [plugin-watch](packages/plugin-watch) – watch for new or changed files matched by glob patterns
* 🗜 [plugin-unpack](packages/plugin-unpack) – unpack .tar/.tar.bz2/.tar.gz/.zip archives

#### Build and bundle

* 🏭 [plugin-lib-babel](packages/plugin-lib-babel) – transform files using [Babel](https://babeljs.io/)
* 🏭 [plugin-lib-esm-loader](packages/plugin-lib-esm-loader) – copy a predefined [ESM loader](https://github.com/standard-things/esm) file to a directory
* 🏭 [plugin-lib-webpack](packages/plugin-lib-webpack) – bundle files using [Webpack](https://webpack.js.org/)
* 🏭 [plugin-lib-webpack-serve](packages/plugin-lib-webpack-serve) – run [Webpack development server](https://github.com/webpack-contrib/webpack-serve)
* 🏭 [plugin-lib-rollup](packages/plugin-lib-rollup) – bundle files using [Rollup](https://rollupjs.org/)
* 🏭 [plugin-lib-typescript-generate](packages/plugin-lib-typescript-generate) – generate `.d.ts` files using [TypeScript](https://www.typescriptlang.org/)
* 🏭 [plugin-lib-flow-generate](packages/plugin-lib-flow-generate) – generate `.js.flow` files using [Flow](https://flow.org/)
* 🏭 [plugin-lib-postcss](packages/plugin-lib-postcss) – transform files using [PostCSS](https://postcss.org/)
* 🏭 plugin-lib-less – [to be migrated](https://github.com/start-runner/less)
* 🏭 plugin-lib-clean-css – [to be migrated](https://github.com/start-runner/clean-css)
* 🏭 plugin-lib-uglify – [to be migrated](https://github.com/start-runner/uglify)

#### Tests

* ✅ [plugin-lib-jest](packages/plugin-lib-jest) – run tests using [Jest](https://facebook.github.io/jest/)
* ✅ [plugin-lib-tape](packages/plugin-lib-tape) – run tests using [Tape](https://github.com/substack/tape)
* ✅ [plugin-lib-karma](packages/plugin-lib-karma) – run tests using [Karma](https://github.com/karma-runner/karma)
* 💯 [plugin-lib-instanbul](packages/plugin-lib-istanbul) – collect, report and check code coverage using [Istanbul](https://istanbul.js.org/)
* ✅ plugin-lib-ava – [to be migrated](https://github.com/start-runner/ava)
* ✅ plugin-lib-mocha – [to be migrated](https://github.com/start-runner/mocha)
* ❓ [plugin-assert](packages/plugin-assert) – Node.js [`assert()`](https://nodejs.org/docs/latest-v8.x/api/all.html#assert_assert_value_message)

#### Lint, check and fix

* 🚷 [plugin-lib-eslint](packages/plugin-lib-eslint) – lint and/or fix code using [ESLint](https://eslint.org/)
* 🚷 [plugin-lib-prettier-eslint](packages/plugin-lib-prettier-eslint) – fix code(style) using [Prettier + ESLint](https://github.com/prettier/prettier-eslint)
* 🚷 [plugin-lib-typescript-check](packages/plugin-lib-typescript-check) – check types using [TypeScript](https://www.typescriptlang.org/)
* 🚷 [plugin-lib-flow-check](packages/plugin-lib-flow-check) – check types using [Flow](https://flow.org/)

#### CI and publish

* 💯 [plugin-lib-codecov](packages/plugin-lib-codecov) – send code coverage report to [codecov.io](https://codecov.io/)
* 🔢 [plugin-lib-npm-version](packages/plugin-lib-npm-version) – bump package version
* 📦 [plugin-lib-npm-publish](packages/plugin-lib-npm-publish) – publish package to NPM
* 💯 plugin-lib-coveralls – [to be migrated](https://github.com/start-runner/coveralls)

### Tasks

Coming soon.

## Roadmap

* [x] stabilize and publish 0.1.0 of everything
* [x] documentation
* [ ] more tests
* [ ] migrate the rest of important plugins

## Copyright

All the packages in this repository are released under the terms of the [MIT License](license.md).

The font used in logo is [supernova fat](http://www.ffonts.net/supernova-fat.font).
