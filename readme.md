👉 This is a next iteration which is currently a *work in progress*, you might want to check old [runner implementation](https://github.com/deepsweet/start/tree/old) and its [plugins](https://github.com/start-runner).

* [ ] stabilize and publish 0.1.0 of everything
* [ ] tests
* [ ] documentation
  * [ ] main readme
    * [x] example
    * [ ] packages
    * [ ] how to "plugin"
    * [ ] how to "reporter"
  * [ ] recipes
    * [x] Node.js libraries monorepo
    * [ ] React components monorepo
    * [ ] React application

-----

<img src="logo.svg" width="100" height="100" align="right" alt="logo"/>

* functional – in all senses
* fast – [parallelism and concurrency](https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism)
* shareable – presets as published packages
* …

## Usage examples

### Node.js libraries monorepo

See [`tasks/index.ts`](tasks/index.ts) for more details – Start project builds itself from sources using sources.

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
  esm \
  @babel/core \
  @babel/register \
  @babel/preset-env \
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
    // default, `./tasks.ts` or `./tasks/index.ts`
    "file": "tasks"
    "require": [
      // https://github.com/standard-things/esm
      "esm",
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
} from '@start/plugin-lib-istanbul/src/'
import tape from '@start/plugin-lib-tape'
import codecov from '@start/plugin-lib-codecov'

const babelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 8
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
    find(`packages/${packageName}**/*.ts`),
    read,
    babel(babelConfig),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write(`packages/${packageName}/build/`)
  )

export const dts = (packageName: string) =>
  sequence(
    find(`packages/${packageName}**/*.ts`),
    typescriptGenerate(`packages/${packageName}/build/`, [
      '--lib',
      'esnext',
      '--allowSyntheticDefaultImports'
    ])
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
  watch(`packages/${packageName}**/*.ts`)(
    pack(packageName)
  )

export const lint = () =>
  sequence(
    findGitStaged(['packages/*/@(src|test)/**/*.ts']),
    read,
    eslint()
  )

export const lintAll = () =>
  sequence(
    find(['packages/*/@(src|test)/**/*.ts']),
    read,
    eslint()
  )

export const test = () =>
  sequence(
    find(`coverage/`),
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
    find('coverage/*.lcov'),
    read,
    codecov
  )
```

```sh
$ yarn start

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
$ yarn start test
```

## Packages

### Core

| Name                                                         | Description                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------- |
| ⬛️ [cli](packages/cli)                                      | CLI entry point to tasks file or preset                           |
| 📄 [reporter-verbose](packages/reporter-verbose)             | Verbose reporter                                                  |
| ⏩ [plugin-sequence](packages/foo)                           | Runs plugins in sequence                                          |
| 🔀 [plugin-parallel](packages/plugin-parallel)               | Runs tasks in parallel with same agruments                        |
| 🔂 [plugin-xargs](packages/plugin-xargs)                     | Runs task in parallel for each argument                           |
| 🐣 [plugin-spawn](packages/plugin-spawn)                     | Spawns new child process                                          |
| 👔 [plugin-env](packages/plugin-env)                         | Sets `process.env`                                                |
| 🔍 [plugin-find](packages/plugin-find)                       | Finds files using glob patterns                                   |
| 🔍 [plugin-find-git-staged](packages/plugin-find-git-staged) | Finds staged in Git files and filters it using glob patterns      |
| 📖 [plugin-read](packages/plugin-read)                       | Reads files content                                               |
| 🔠 [plugin-rename](packages/plgun-rename)                    | Renames files                                                     |
| ❌ [plugin-remove](packages/plugin-remove)                   | Removes files or directories                                      |
| 👯 [plugin-copy](packages/plugin-copy)                       | Copies files to relative destination preserving folders structure |
| ✏️ [plugin-write](packages/plugin-write)                     | Writes files to relative destination preserving folders structure |
| ✏️ [plugin-overwrite](packages/plugin-overwrite)             | Overwrites files                                                  |
| 👀 [plugin-watch](packages/plugin-watch)                     | Watches for new or changed files matched by globs patterns        |
| 🔌 [plugin-input-files](packages/plugin-input-files)         | Inject arguments as input files                                   |
| ✅ [plugin-assert](packages/plugin-assert)                   | Node.js `assert()` as a plugin                                    |

### Lib

#### Build and bundle

| Name                                                             | Description                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------------- |
| 🏭 [plugin-lib-babel](packages/plugin-lib-babel)                 | Transpiles files data using Babel                           |
| 🏭 [plugin-lib-webpack](packages/plugin-lib-webpack)             | Bundles files using Webpack                                 |
| 🏭 [plugin-lib-webpack-serve](packages/plugin-lib-webpack-serve) | Runs Webpack development server                             |
| 🏭 plugin-lib-postcss                                            | [To be migrated](https://github.com/start-runner/postcss)   |
| 🏭 plugin-lib-less                                               | [To be migrated](https://github.com/start-runner/less)      |
| 🏭 plugin-lib-clean-css                                          | [To be migrated](https://github.com/start-runner/clean-css) |
| 🏭 plugin-lib-uglify                                             | [To be migrated](https://github.com/start-runner/uglify)    |

#### Tests

| Name                                                    | Description                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| ✅ [plugin-lib-jest](packages/plugin-lib-jest)          | Runs tests using Jest                                          |
| ✅ [plugin-lib-tape](packages/plugin-lib-tape)          | Runs tests using Tape                                          |
| ✅ plugin-lib-ava                                       | [To be migrated](https://github.com/start-runner/ava)          |
| ✅ plugin-lib-mocha                                     | [To be migrated](https://github.com/start-runner/mocha)        |
| ✅ plugin-lib-karma                                     | [To be migrated](https://github.com/start-runner/karma)        |
| 💯 [plugin-lib-instanbul](packages/plugin-lib-istanbul) | Instruments, collects and reports code coverage using Istanbul |

#### Lint and codestyle

| Name                                                                 | Description                              |
| -------------------------------------------------------------------- | ---------------------------------------- |
| 🚷 [plugin-lib-eslint](packages/plugin-lib-eslint)                   | Lints and/or fixes files with ESlint     |
| 🚷 [plugin-lib-flow-check](packages/plugin-lib-flow-check)           | Checks types with Flow                   |
| 💄 [plugin-lib-prettier-eslint](packages/plugin-lib-prettier-eslint) | Fixes code(style) with Prettier + ESLint |

#### CI and publish

| Name                                                         | Description                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| 💯 [plugin-lib-codecov](packages/plugin-lib-codecov)         | Sends coverage info to codecov.io                           |
| 💯 plugin-lib-coveralls                                      | [To be migrated](https://github.com/start-runner/coveralls) |
| 🔢 [plugin-lib-npm-version](packages/plugin-lib-npm-version) | Bumps package version                                       |
| 📦 [plugin-lib-npm-publish](packages/plugin-lib-npm-publish) | Publishes package to NPM                                    |
