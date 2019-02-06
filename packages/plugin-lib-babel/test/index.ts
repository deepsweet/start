import test from 'blue-tape'

import babel from '../src'

test('plugin-lib-babel: export', async (t) => {
  t.equals(
    typeof babel,
    'function',
    'must be a function'
  )
})
