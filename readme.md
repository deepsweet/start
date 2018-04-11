# @start

👉 This is a next iteration which is currently a WORK IN PROGRESS, you might want to check old [runner implementation](https://github.com/deepsweet/start/tree/old) and its [plugins](https://github.com/start-runner).

* [ ] API experiments
* [ ] make sure that it works in "strict" ESM
* [ ] stabilize and publish 0.1.0 of everything
* [ ] tests
* [ ] documentation
  * [ ] main readme
  * [ ] recipes

## Example

"Pack" 2 packages in parallel child processes: transpile and generate type definitions in parallel child-child processes with concurrently running promises inside of each process:

```
packages/
├── foo/
│   ├── build/
│   │   └── index.mjs
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── readme.md
└── bar/
    ├── build/
    │   └── index.mjs
    ├── src/
    │   └── index.ts
    ├── package.json
    └── readme.md
```

```js
export const build = (packageName) =>
  sequence(
    find(`packages/${packageName}/src/**/*.ts`),
    read,
    babel({ ...babelConfig, babelrc: false }),
    rename((file) => file.replace(/\.ts$/, '.mjs')),
    write(`packages/${packageName}/build/`)
  )
```

```sh
$ yarn start build foo
```

```js
export const dts = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/src/**/*.ts`),
    typescriptGenerate(`packages/${packageName}/build/`, [
      '--lib',
      'esnext',
      '--allowSyntheticDefaultImports'
    ])
  )
```

```sh
$ yarn start dts foo
```

```js
export const pack = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/build/`),
    remove,
    parallel(['build', 'dts'])(packageName)
  )
```

```sh
$ yarn start pack foo
```

```js
export const packs = xargs('pack')
```

```sh
$ yarn start packs foo bar
```

```js
export const dev = (packageName: string) =>
  watch(`packages/${packageName}/src/**/*.ts`)(
    pack(packageName)
  )
```

```sh
$ yarn start dev foo
```

## Packages

### Core

| Name                                                         | Published                                                                                                                                               | Description                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ⬛️ [cli](packages/cli)                                      | [![npm](https://img.shields.io/npm/v/@start/cli.svg?style=flat-square)](https://www.npmjs.com/package/@start/cli)                                       | Runs tasks file or preset                                         |
| 📄 [reporter-verbose](packages/reporter-verbose)             | [![npm](https://img.shields.io/npm/v/@start/reporter-verbose.svg?style=flat-square)](https://www.npmjs.com/package/@start/reporter-verbose)             | Verbose reporter                                                  |
| ⏩ [plugin-sequence](packages/plugin-sequence)               | [![npm](https://img.shields.io/npm/v/@start/plugin-sequence.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-sequence)               | Runs plugins in sequence                                          |
| 🔀 [plugin-parallel](packages/plugin-parallel)               | [![npm](https://img.shields.io/npm/v/@start/plugin-parallel.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-parallel)               | Runs tasks in parallel with same agruments                        |
| 🔂 [plugin-xargs](packages/plugin-xargs)                     | [![npm](https://img.shields.io/npm/v/@start/plugin-xargs.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-xargs)                     | Runs task in parallel for each argument                           |
| 🐣 [plugin-spawn](packages/plugin-spawn)                     | [![npm](https://img.shields.io/npm/v/@start/plugin-spawn.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-spawn)                     | Spawns new child process                                          |
| 👔 [plugin-env](packages/plugin-env)                         | [![npm](https://img.shields.io/npm/v/@start/plugin-env.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-env)                         | Sets `process.env`                                                |
| 🔍 [plugin-find](packages/plugin-find)                       | [![npm](https://img.shields.io/npm/v/@start/plugin-find.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-find)                       | Finds files using glob patterns                                   |
| 🔍 [plugin-find-git-staged](packages/plugin-find-git-staged) | [![npm](https://img.shields.io/npm/v/@start/plugin-find-git-staged.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-find-git-staged) | Finds staged in Git files and filters it using glob patterns      |
| 📖 [plugin-read](packages/plugin-read)                       | [![npm](https://img.shields.io/npm/v/@start/plugin-read.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-read)                       | Reads files content                                               |
| 🔠 [plugin-rename](packages/plgun-rename)                    | [![npm](https://img.shields.io/npm/v/@start/plugin-rename.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-rename)                   | Renames files                                                     |
| ❌ [plugin-remove](packages/plugin-remove)                   | [![npm](https://img.shields.io/npm/v/@start/plugin-remove.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-remove)                   | Removes files or directories                                      |
| 👯 [plugin-copy](packages/plugin-copy)                       | [![npm](https://img.shields.io/npm/v/@start/plugin-copy.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-copy)                       | Copies files to relative destination preserving folders structure |
| ✏️ [plugin-write](packages/plugin-write)                     | [![npm](https://img.shields.io/npm/v/@start/plugin-write.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-write)                     | Writes files to relative destination preserving folders structure |
| ✏️ [plugin-overwrite](packages/plugin-overwrite)             | [![npm](https://img.shields.io/npm/v/@start/plugin-overwrite.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-overwrite)             | Overwrites files                                                  |
| 👀 [plugin-watch](packages/plugin-watch)                     | [![npm](https://img.shields.io/npm/v/@start/plugin-watch.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-watch)                     | Watches for new or changed files matched by globs patterns        |
| 🔌 [plugin-input-files](packages/plugin-input-files)         | [![npm](https://img.shields.io/npm/v/@start/plugin-input-files.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-input-files)         | Inject arguments as input files                                   |
| ✅ [plugin-assert](packages/plugin-assert)                   | [![npm](https://img.shields.io/npm/v/@start/plugin-assert.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin-assert)                   | Node.js `assert()` as a plugin                                    |

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
| 🚷 [plugin-lib-eslint](packages/plugin-lib-eslint)                   | Lints files with ESlint                  |
| 🚷 [plugin-lib-flow-check](packages/plugin-lib-flow-check)           | Checks types with Flow                   |
| 💄 [plugin-lib-prettier-eslint](packages/plugin-lib-prettier-eslint) | Fixes code(style) with Prettier + ESLint |

#### CI and publish

| Name                                                         | Description                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| 💯 [plugin-lib-codecov](packages/plugin-lib-codecov)         | Sends coverage info to codecov.io                           |
| 💯 plugin-lib-coveralls                                      | [To be migrated](https://github.com/start-runner/coveralls) |
| 🔢 [plugin-lib-npm-version](packages/plugin-lib-npm-version) | Bumps package version                                       |
| 📦 [plugin-lib-npm-publish](packages/plugin-lib-npm-publish) | Publishes package to NPM                                    |
