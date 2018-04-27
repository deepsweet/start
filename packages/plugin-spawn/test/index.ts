import test from 'tape'

import spawn from '../src'

test('plugin-spawn: export', (t) => {
  t.equal(
    typeof spawn,
    'function',
    'must be a function'
  )

  t.end()
})
