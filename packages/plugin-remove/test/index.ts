import test from 'tape'

import remove from '../src'

test('plugin-remove: export', (t) => {
  t.equal(
    typeof remove,
    'function',
    'must be a function'
  )

  t.end()
})
