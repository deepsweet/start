import test from 'tape'

import watch from '../src'

test('plugin-watch: export', (t) => {
  t.equal(
    typeof watch,
    'function',
    'must be a function'
  )

  t.end()
})
