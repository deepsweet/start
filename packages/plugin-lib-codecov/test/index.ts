import test from 'tape'

import codecov from '../src'

test('plugin-lib-codecov: export', (t) => {
  t.equal(
    typeof codecov,
    'function',
    'must be a function'
  )

  t.end()
})
