import test from 'tape'

import jest from '../src'

test('plugin-lib-jest: export', (t) => {
  t.equal(
    typeof jest,
    'function',
    'must be a function'
  )

  t.end()
})
