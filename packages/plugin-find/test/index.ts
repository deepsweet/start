import test from 'tape'

import find from '../src'

test('plugin-find: export', (t) => {
  t.equal(
    typeof find,
    'function',
    'must be a function'
  )

  t.end()
})
