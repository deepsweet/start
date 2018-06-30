import test from 'tape'

import rollup from '../src'

test('plugin-lib-rollup: export', (t) => {
  t.equal(
    typeof rollup,
    'function',
    'must be a function'
  )

  t.end()
})
