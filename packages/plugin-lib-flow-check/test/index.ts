import test from 'blue-tape'

import flowCheck from '../src'

test('plugin-lib-flow-check: export', async (t) => {
  t.equals(
    typeof flowCheck,
    'function',
    'must be a function'
  )
})
