# @start

👉 This is a next iteration which is currently a work in progress, you might want to check old [runner implementation](https://github.com/deepsweet/start/tree/old) and its [plugins](https://github.com/start-runner).

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
