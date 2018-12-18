import test from 'blue-tape'

import rename from '../src'

test('plugin-rename: export', async (t) => {
  t.equals(
    typeof rename,
    'function',
    'must be a function'
  )
})
