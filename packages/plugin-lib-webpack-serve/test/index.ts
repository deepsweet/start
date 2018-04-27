import test from 'tape'

import webpackServe from '../src'

test('plugin-lib-webpack-serve: export', (t) => {
  t.equal(
    typeof webpackServe,
    'function',
    'must be a function'
  )

  t.end()
})
