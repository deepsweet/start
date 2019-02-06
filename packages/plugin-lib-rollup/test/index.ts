import test from 'blue-tape'

import rollup from '../src'

test('plugin-lib-rollup: export', async (t) => {
  t.equals(
    typeof rollup,
    'function',
    'must be a function'
  )
})
