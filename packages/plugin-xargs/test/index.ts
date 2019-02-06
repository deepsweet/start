import test from 'blue-tape'

import xargs from '../src'

test('plugin-xargs: export', async (t) => {
  t.equals(
    typeof xargs,
    'function',
    'must be a function'
  )
})
