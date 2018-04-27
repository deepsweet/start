import test from 'tape'

import parallel from '../src'

test('plugin-parallel: export', (t) => {
  t.equal(
    typeof parallel,
    'function',
    'must be a function'
  )

  t.end()
})
