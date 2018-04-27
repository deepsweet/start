import test from 'tape'

import eslint from '../src'

test('plugin-lib-eslint: export', (t) => {
  t.equal(
    typeof eslint,
    'function',
    'must be a function'
  )

  t.end()
})
