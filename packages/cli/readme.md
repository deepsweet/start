# @start/cli

## Install

```sh
$ yarn add --dev @start/cli
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
```
