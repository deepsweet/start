import test from 'tape'

import xargs from '../src'

test('plugin-xargs: export', (t) => {
  t.equal(
    typeof xargs,
    'function',
    'must be a function'
  )

  t.end()
})
