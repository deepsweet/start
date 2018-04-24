# @start/plugin-lib-codecov

Send code coverage report to [codecov.io](https://codecov.io/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-codecov
```

## Usage

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import codecov from '@start/plugin-lib-codecov'

export task = () =>
  sequence(
    find('coverage/lcov.info'),
    read,
    codecov
  )
```
