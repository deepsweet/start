import test from 'tape'

import overwrite from '../src'

test('plugin-overwrite: export', (t) => {
  t.equal(
    typeof overwrite,
    'function',
    'must be a function'
  )

  t.end()
})
