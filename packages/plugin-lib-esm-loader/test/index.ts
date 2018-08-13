import test from 'tape'

import esm from '../src'

test('plugin-lib-esm: export', (t) => {
  t.equal(
    typeof esm,
    'function',
    'must be a function'
  )

  t.end()
})
