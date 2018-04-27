import test from 'tape'

import typescriptGenerate from '../src'

test('plugin-lib-typescript-generate: export', (t) => {
  t.equal(
    typeof typescriptGenerate,
    'function',
    'must be a function'
  )

  t.end()
})
