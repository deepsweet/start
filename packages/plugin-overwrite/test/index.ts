import test from 'blue-tape'

import overwrite from '../src'

test('plugin-overwrite: export', async (t) => {
  t.equals(
    typeof overwrite,
    'function',
    'must be a function'
  )
})
