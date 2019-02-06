import test from 'blue-tape'

import esm from '../src'

test('plugin-lib-esm: export', async (t) => {
  t.equals(
    typeof esm,
    'function',
    'must be a function'
  )
})
