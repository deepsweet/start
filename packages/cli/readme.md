# @start/cli

```sh
$ yarn add --dev @start/cli
```

```js
// package.json

"start": {
  // `./tasks` by default, so `./tasks.js` or `./tasks/index.js`
  "file": "./my-tasks-file.js",
  // optional module name as a preset
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
