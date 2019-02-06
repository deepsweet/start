import test from 'blue-tape'

import webpack from '../src'

test('plugin-lib-webpack: export', async (t) => {
  t.equals(
    typeof webpack,
    'function',
    'must be a function'
  )
})
