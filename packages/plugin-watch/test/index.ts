import test from 'blue-tape'

import watch from '../src'

test('plugin-watch: export', async (t) => {
  t.equals(
    typeof watch,
    'function',
    'must be a function'
  )
})
