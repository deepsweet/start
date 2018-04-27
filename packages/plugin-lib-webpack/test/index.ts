import test from 'tape'

import webpack from '../src'

test('plugin-lib-webpack: export', (t) => {
  t.equal(
    typeof webpack,
    'function',
    'must be a function'
  )

  t.end()
})
