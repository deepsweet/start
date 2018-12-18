import test from 'blue-tape'

import typescriptGenerate from '../src'

test('plugin-lib-typescript-generate: export', async (t) => {
  t.equals(
    typeof typescriptGenerate,
    'function',
    'must be a function'
  )
})
