import test from 'tape'

import flowCheck from '../src'

test('plugin-lib-flow-check: export', (t) => {
  t.equal(
    typeof flowCheck,
    'function',
    'must be a function'
  )

  t.end()
})
