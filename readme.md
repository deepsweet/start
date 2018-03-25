# @start

👉 This is a next iteration which is currently a work in progress, you might want to check old [runner implementation](https://github.com/deepsweet/start/tree/old) and its [plugins](https://github.com/start-runner).

## Usage example

Imagine that every task in your "javascript pipeline" is a Promise. It's fair enough in most cases, kinda async boolean when your task may be either in "done" or "fail" state.

### "build"

```
packages/
├── foo/
│   ├── build/
│   │   └── index.js
│   ├── src/
│   │   └── index.mjs
│   ├── package.json
│   └── readme.md
└── bar/
    ├── build/
    │   └── index.js
    ├── src/
    │   └── index.mjs
    ├── package.json
    └── readme.md
```

Now let's imagine how simple `buildPackage` lazy task could be written in code:

```js
const buildPackage = (target) => (
  // * set NODE_ENV to production
  // * clean up target directory
  // * find files using globs
  // * read files data
  // * transform files data using Babel
  // * write files into target directory,
  //   for example from `packages/foo/src/index.mjs` to `packages/foo/build/index.js`
)
```

And here is a corresponding Start task:

```js
export const buildPackage = (packageName) => sequence(
  env('NODE_ENV', 'production'),
  find(`packages/${packageName}/build/`),
  clean,
  find(`packages/${packageName}/src/**/*.mjs`),
  read,
  babel({ ...babelConfig, babelrc: false }),
  rename((file) => file.replace(/\.mjs$/, '.js')),
  write(`packages/${packageName}/build/`)
)
```

And CLI:

```sh
$ yarn start buildPackage foo
```

And reporter:

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
$ yarn start buildPackages foo bar
```

```sh
# mess of async lines as a report
```

2 packages were built in parallel child processes, both ESM and CJS in parallel child-child processes on their own with concurrently running promises inside of each process.

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

| Name                                           | Description                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| ⏩ [sequence](packages/sequence)               | Runs plugins in sequence                                                     |
| 🔀 [parallel](packages/parallel)               | Runs tasks in parallel with same agruments                                   |
| 🔂 [xargs](packages/xargs)                     | Runs task in parallel for each argument                                      |
| 🐣 [spawn](packages/spawn)                     | Spawns new child process                                                     |
| 🔌 [input](packages/input)                     | Connects external input into a task flow                                     |
| ⬛️ [cli](packages/cli)                        | Runs tasks file or preset, uses `start` field in `package.json` for settings |
| 📄 [reporter](packages/reporter)               | Reporter "middleware"                                                        |
| 👔 [env](packages/env)                         | Sets `process.env`                                                           |
| 🔍 [find](packages/find)                       | Finds files using glob patterns                                              |
| 🔍 [find-git-staged](packages/find-git-staged) | Finds staged in Git files and filters it using glob patterns                 |
| 📖 [read](packages/read)                       | Reads files content                                                          |
| 🔠 [rename](packages/rename)                   | Renames files                                                                |
| 🚽 [clean](packages/clean)                     | Deletes folders/files                                                        |
| 👯 [copy](packages/copy)                       | Copies files to relative destination preserving nested folders structure     |
| ✏️ [write](packages/write)                     | Writes files to relative destination preserving nested folders structure     |
| ✏️ [overwrite](packages/lib/overwrite)         | Overwrites files                                                             |
| 👀 [watch](packages/watch)                     | Watches for new or changed files matched by globs patterns                   |

### Lib

#### Build and bundle

| Name                                               | Description                                                 |
| -------------------------------------------------- | ----------------------------------------------------------- |
| 🏭 [lib-babel](packages/lib/babel)                 | Transpiles files data using Babel                           |
| 🏭 [lib-webpack](packages/lib/webpack)             | Bundles files using Webpack                                 |
| 🏭 [lib-webpack-serve](packages/lib/webpack-serve) | Runs Webpack development server                             |
| 🏭 lib-postcss                                     | [To be migrated](https://github.com/start-runner/postcss)   |
| 🏭 lib-less                                        | [To be migrated](https://github.com/start-runner/less)      |
| 🏭 lib-clean-css                                   | [To be migrated](https://github.com/start-runner/clean-css) |
| 🏭 lib-uglify                                      | [To be migrated](https://github.com/start-runner/uglify)    |

#### Tests

| Name                                      | Description                                                    |
| ----------------------------------------- | -------------------------------------------------------------- |
| ✅ [lib-jest](packages/lib/jest)          | Runs tests using Jest                                          |
| ✅ [lib-tape](packages/lib/tape)          | Runs tests using Tape                                          |
| ✅ lib-ava                                | [To be migrated](https://github.com/start-runner/ava)          |
| ✅ lib-mocha                              | [To be migrated](https://github.com/start-runner/mocha)        |
| ✅ lib-karma                              | [To be migrated](https://github.com/start-runner/karma)        |
| 💯 [lib-instanbul](packages/lib/istanbul) | Instruments, collects and reports code coverage using Istanbul |

#### Lint and codestyle

| Name                                                   | Description                              |
| ------------------------------------------------------ | ---------------------------------------- |
| 🚷 [lib-eslint](packages/lib/eslint)                   | Lints files with ESlint                  |
| 🚷 [lib-flow-check](packages/lib/flow-check)           | Checks types with Flow                   |
| 💄 [lib-prettier-eslint](packages/lib/prettier-eslint) | Fixes code(style) with Prettier + ESLint |

#### CI and publish

| Name                                           | Description                                                 |
| ---------------------------------------------- | ----------------------------------------------------------- |
| 💯 [lib-codecov](packages/lib/codecov)         | Sends coverage info to codecov.io                           |
| 💯 lib-coveralls                               | [To be migrated](https://github.com/start-runner/coveralls) |
| 🔢 [lib-npm-version](packages/lib/npm-version) | Bumps package version                                       |
| 📦 [lib-npm-publish](packages/lib/npm-publish) | Publishes package to NPM                                    |
