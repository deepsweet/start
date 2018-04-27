import test from 'tape'

import copy from '../src'

test('plugin-copy: export', (t) => {
  t.equal(
    typeof copy,
    'function',
    'must be a function'
  )

  t.end()
})
