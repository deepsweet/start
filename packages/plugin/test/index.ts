import test from 'tape'

import plugin from '../src'

test('plugin: export', (t) => {
  t.equal(
    typeof plugin,
    'function',
    'must be a function'
  )

  t.end()
})
