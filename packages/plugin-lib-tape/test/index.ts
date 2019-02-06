import test from 'blue-tape'

import tape from '../src'

test('plugin-lib-tape: export', async (t) => {
  t.equals(
    typeof tape,
    'function',
    'must be a function'
  )
})
