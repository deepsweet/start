import test from 'tape'

import read from '../src'

test('plugin-read: export', (t) => {
  t.equal(
    typeof read,
    'function',
    'must be a function'
  )

  t.end()
})
