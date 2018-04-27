import test from 'tape'

import assert from '../src'

test('plugin-assert: export', (t) => {
  t.equal(
    typeof assert,
    'function',
    'must be a function'
  )

  t.end()
})
