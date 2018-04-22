# @start/plugin-lib-istanbul

Collect, report and check code coverage using [Istanbul](https://istanbul.js.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-istanbul
```

## Usage

```ts
istanbulInstrument(options?: {
  preserveComments?: boolean,
  compact?: boolean,
  esModules?: boolean,
  autoWrap?: boolean,
  produceSourceMap?: boolean,
  extensions?: string[],
})
```

```ts
istanbulReports(formats: string[] = ['lcovonly', 'text-summary'])
```

```ts
istanbulThresholds(options?: {
  branches?: number,
  functions?: number,
  lines?: number,
  statements?: number
})
```

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '@start/plugin-lib-istanbul'
import tape from '@start/plugin-lib-tape'

export const task = () =>
  sequence(
    find('src/*.js'),
    istanbulInstrument({ esModules: true }),
    find('test/*.js'),
    tape(),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({ functions: 100 })
  )
```
