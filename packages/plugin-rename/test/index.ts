import test from 'tape'

import rename from '../src'

test('plugin-rename: export', (t) => {
  t.equal(
    typeof rename,
    'function',
    'must be a function'
  )

  t.end()
})
