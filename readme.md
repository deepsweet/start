# @start

👉 This is a next iteration which is currently a work in progress, you might want to check old [runner implementation](https://github.com/deepsweet/start/tree/old) and its [plugins](https://github.com/start-runner).

## What

Imagine that every task in your "javascript pipeline" is a Promise. It's fair enough in most cases, kinda async boolean when your task may be either in "done" or "fail" state.

### "build"

Now let's imagine how simple `buildPackage` lazy task could be written in code:

```js
const buildPackage = (target) => (
  // * set NODE_ENV to production
  // * clean up target directory
  // * find files with globs
  // * read file data
  // * transform file data with Babel
  // * write files into target directory,
  //   for example from `packages/foo/src/index.mjs` to `packages/foo/build/index.js`
)
```

And now actual Start code:

```js
export const buildPackage = (packageName) => sequence(
  env('NODE_ENV', 'production'),
  find(`packages/${packageName}/build/`),
  clean,
  find(`packages/${packageName}/src/**/*.js`),
  read,
  babel({ ...babelConfig, babelrc: false }),
  rename((file) => file.replace(/\.mjs$/, '.js')),
  write(`packages/${packageName}/build/`)
)
```

And @start/cli:

```sh
$ yarn start buildPackage foo
```

And @start/reporter:

```sh
yarn run v1.5.1
$ /…/myProject/node_modules/.bin/start buildPackage foo
buildPackage.env: start
buildPackage.env: NODE_ENV = production
buildPackage.env: done
buildPackage.find: start
buildPackage.find: packages/foo/build
buildPackage.find: done
buildPackage.clean: start
buildPackage.clean: packages/foo/build
buildPackage.clean: done
buildPackage.find: start
buildPackage.find: packages/foo/src/index.mjs
buildPackage.find: done
buildPackage.read: start
buildPackage.read: packages/foo/src/index.mjs
buildPackage.read: done
buildPackage.babel: start
buildPackage.babel: packages/foo/src/index.mjs
buildPackage.babel: done
buildPackage.rename: start
buildPackage.rename: packages/foo/src/index.js
buildPackage.rename: done
buildPackage.write: start
buildPackage.write: packages/foo/build/index.js
buildPackage.write: done
✨  Done in 0.98s.
```

🤔

Build package in ESM and CJS versions in parallel using child processes (always try to use [esm](https://github.com/standard-things/esm) only, the following is just an example):


```js
export const buildEsm = (packageName) => sequence(
  // ...
)

export const buildCjs = (packageName) => sequence(
  // ...
)

export const buildPackage = (packageName) => sequence(
  env('NODE_ENV', 'production'),
  find(`packages/${packageName}/build/`),
  clean,
  parallel(buildEsm, buildCjs)(packageName)
)
```

```sh
$ yarn start buildPackage foo
```

```sh
# mess of async lines as a report
```

🛠

Let's double it:

```js
export const buildPackages = xargs(buildPackage)
```

```sh
$ yarn start buildPackages foo bar baz
```

```sh
# mess of async lines as a report
```

We just build 3 packages in parallel child processes, both ESM and CJS in parallel child-child processes on their own with concurrently running promises inside of each process.

🛫

To be continued…

<!--
Run `prettier-eslint` to fix all the files in parallel:

```js
export const fixFile = (file) => task(
  input(file),
  read,
  prettierEslint(),
  overwrite
)

export const fix = () => task(
  find(`packages/${packageName}/src/**/*.js`),
  xargs(fixFile, { workers: 4 })
)
```

```sh
$ yarn start fix
``` -->

## Packages

### Core

| Name                             | Description                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| 🔴 [task](packages/task)         | Runs plugins in sequence                                                     |
| 📄 [reporter](packages/reporter) | Reporter, simple `EventEmitter` instance wrapper                             |
| ⬛️ [cli](packages/cli)          | Runs tasks file or preset, uses `start` field in `package.json` for settings |

### Plugins

#### Core

| Name                                                         | Description                                        |
| ------------------------------------------------------------ | -------------------------------------------------- |
| 🚋 [plugin-sub-task](packages/plugin-sub-task)               | Includes other task runners into current task flow |
| 🔌 [plugin-input-connector](packages/plugin-input-connector) | Connects external input into current task flow     |

#### System

| Name                                           | Description                                     |
| ---------------------------------------------- | ----------------------------------------------- |
| 👔 [plugin-env](packages/plugin-env)           | Sets `process.env`                              |
| 🐣 [plugin-spawn](packages/plugin-spawn)       | Spawns new child process                        |
| 🔀 [plugin-parallel](packages/plugin-parallel) | Spawns multiple task runners as child processes |

#### Files

| Name                                                         | Description                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| 🔍 [plugin-find](packages/plugin-find)                       | Finds files using glob patterns                                          |
| 🔍 [plugin-find-git-staged](packages/plugin-find-git-staged) | Finds staged in Git files and filters it using glob patterns             |
| 📖 [plugin-read](packages/plugin-read)                       | Reads files content                                                      |
| 🔠 [plugin-rename](packages/plugin-rename)                   | Renames files                                                            |
| 🚽 [plugin-clean](packages/plugin-clean)                     | Deletes folders/files                                                    |
| 👯 [plugin-copy](packages/plugin-copy)                       | Copies files to relative destination preserving nested folders structure |
| ✏️ [plugin-write](packages/plugin-write)                     | Writes files to relative destination preserving nested folders structure |
| ✏️ [plugin-overwrite](packages/plugin-overwrite)             | Overwrites files                                                         |
| 👀 [plugin-watch](packages/plugin-watch)                     | Watches for new or changed files matched by globs patterns               |

#### Build and bundle

| Name                                                     | Description                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| 🏭 [plugin-babel](packages/plugin-babel)                 | Transpiles files data using Babel                           |
| 🏭 [plugin-webpack](packages/plugin-webpack)             | Bundles files using Webpack                                 |
| 🏭 [plugin-webpack-serve](packages/plugin-webpack-serve) | Runs Webpack development server                             |
| 🏭 plugin-postcss                                        | [To be migrated](https://github.com/start-runner/postcss)   |
| 🏭 plugin-less                                           | [To be migrated](https://github.com/start-runner/less)      |
| 🏭 plugin-clean-css                                      | [To be migrated](https://github.com/start-runner/clean-css) |
| 🏭 plugin-uglify                                         | [To be migrated](https://github.com/start-runner/uglify)    |

#### Tests

| Name                                            | Description                                                    |
| ----------------------------------------------- | -------------------------------------------------------------- |
| ✅ [plugin-jest](packages/plugin-jest)          | Runs tests using Jest                                          |
| ✅ [plugin-tape](packages/plugin-tape)          | Runs tests using Tape                                          |
| ✅ plugin-ava                                   | [To be migrated](https://github.com/start-runner/ava)          |
| ✅ plugin-mocha                                 | [To be migrated](https://github.com/start-runner/mocha)        |
| ✅ plugin-karma                                 | [To be migrated](https://github.com/start-runner/karma)        |
| 💯 [plugin-instanbul](packages/plugin-istanbul) | Instruments, collects and reports code coverage using Istanbul |

#### Lint and codestyle

| Name                                                         | Description                              |
| ------------------------------------------------------------ | ---------------------------------------- |
| 🚷 [plugin-eslint](packages/plugin-eslint)                   | Lints files with ESlint                  |
| 🚷 [plugin-flow-check](packages/plugin-flow-check)           | Checks types with Flow                   |
| 💄 [plugin-prettier-eslint](packages/plugin-prettier-eslint) | Fixes code(style) with Prettier + ESLint |

#### CI and publish

| Name                                                 | Description                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------- |
| 💯 [plugin-codecov](packages/plugin-codecov)         | Sends coverage info to codecov.io                           |
| 💯 plugin-coveralls                                  | [To be migrated](https://github.com/start-runner/coveralls) |
| 🔢 [plugin-npm-version](packages/plugin-npm-version) | Bumps package version                                       |
| 📦 [plugin-npm-publish](packages/plugin-npm-publish) | Publishes package to NPM                                    |
