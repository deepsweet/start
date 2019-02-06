import test from 'blue-tape'

import codecov from '../src'

test('plugin-lib-codecov: export', async (t) => {
  t.equals(
    typeof codecov,
    'function',
    'must be a function'
  )
})
