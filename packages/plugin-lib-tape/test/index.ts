import test from 'tape'

import tape from '../src'

test('plugin-lib-tape: export', (t) => {
  t.equal(
    typeof tape,
    'function',
    'must be a function'
  )

  t.end()
})
