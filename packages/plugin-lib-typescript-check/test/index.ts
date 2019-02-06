import test from 'blue-tape'

import typescriptCheck from '../src'

test('plugin-lib-typescript-check: export', async (t) => {
  t.equals(
    typeof typescriptCheck,
    'function',
    'must be a function'
  )
})
