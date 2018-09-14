import test from 'tape'

import copy from '../src'

test('plugin-lib-auto: export', (t) => {
  t.equal(
    typeof copy,
    'function',
    'must be a function'
  )

  t.end()
})
