import test from 'blue-tape'

import write from '../src'

test('plugin-write: export', async (t) => {
  t.equals(
    typeof write,
    'function',
    'must be a function'
  )
})
