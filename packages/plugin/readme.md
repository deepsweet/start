# ⚙️ plugin

[![npm](https://img.shields.io/npm/v/@start/plugin.svg?style=flat-square)](https://www.npmjs.com/package/@start/plugin) [![linux](https://img.shields.io/travis/deepsweet/start/master.svg?label=linux&style=flat-square)](https://travis-ci.org/deepsweet/start) [![windows](https://img.shields.io/appveyor/ci/deepsweet/start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/deepsweet/start) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/start/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/start) [![deps](https://david-dm.org/deepsweet/start.svg?path=packages/plugin&style=flat-square)](https://david-dm.org/deepsweet/start?path=packages/plugin)

Start plugin "creator".

## Install

```sh
$ yarn add @start/plugin
```

## Usage

### Types

```ts
type StartFile = {
  path: string,
  data: null | string,
  map: null | {}
}

type StartFiles = StartFile[]

type StartPluginProps = {
  files: StartFiles,
  reporter: NodeJS.EventEmitter,
  logFile: (file: string) => void,
  logMessage: (message: string) => void
}

type StartPluginOut = StartFiles | Promise<StartFiles>

type StartPlugin = (props: StartPluginProps) => StartPluginOut
```

### Example

```js
import plugin from '@start/plugin'

export default plugin('noop', ({ files }) => files)
```

```js
import plugin from '@start/plugin'

export default plugin('foo', async ({ files, logFile }) => {
  const { default: fooTransform } = await import('foo-lib')

  return Promise.all(
    files.map((file) =>
      fooTransform(file.data).then(({ transformedData, sourceMap }) => {
        logFile(file.path)

        return {
          path: file.path,
          data: transformedData,
          map: sourceMap
        }
      })
    )
  )
})
```

```js
import plugin from '@start/plugin'

export default (barOptions) =>
  plugin('bar', async ({ files, logMessage }) => {
    const { default: barCheck } = await import('bar-lib')

    const barResult = barCheck(files, barOptions)

    if (barResult.issues.length === 0) {
      logMessage('¯\\_(ツ)_/¯')
    }

    return files
  })
```

## Notes

* Dynamic imports – [it's a good idea](https://github.com/gulpjs/gulp/issues/632) to "lazyload" dependencies inside of a plugin function instead of importing them at top.
* `files` – `StartFiles | Promise<StartFiles>` – a requirement even if this means to just pass it through.
* `logMessage` – any random message from plugin.
* `logFile` – current file path to indicate some kind of progress.
* `reporter` – advanced prop which should be passed through if plugin operates other plugins, like [sequence](../plugin-sequence) or [watch](../plugin-watch).
