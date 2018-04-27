import test from 'tape'

import flowGenerate from '../src'

test('plugin-lib-flow-generate: export', (t) => {
  t.equal(
    typeof flowGenerate,
    'function',
    'must be a function'
  )

  t.end()
})
