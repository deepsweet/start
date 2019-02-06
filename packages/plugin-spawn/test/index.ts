import test from 'blue-tape'

import spawn from '../src'

test('plugin-spawn: export', async (t) => {
  t.equals(
    typeof spawn,
    'function',
    'must be a function'
  )
})
