import test from 'blue-tape'

import karma from '../src'

test('plugin-lib-karma: export', async (t) => {
  t.equals(
    typeof karma,
    'function',
    'must be a function'
  )
})
