import test from 'blue-tape'

import jest from '../src'

test('plugin-lib-jest: export', async (t) => {
  t.equals(
    typeof jest,
    'function',
    'must be a function'
  )
})
