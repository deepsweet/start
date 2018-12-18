import test from 'blue-tape'

import eslint from '../src'

test('plugin-lib-eslint: export', async (t) => {
  t.equals(
    typeof eslint,
    'function',
    'must be a function'
  )
})
