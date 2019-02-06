import test from 'blue-tape'

import find from '../src'

test('plugin-find: export', async (t) => {
  t.equals(
    typeof find,
    'function',
    'must be a function'
  )
})
