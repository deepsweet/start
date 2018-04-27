import test from 'tape'

import env from '../src'

test('plugin-env: export', (t) => {
  t.equal(
    typeof env,
    'function',
    'must be a function'
  )

  t.end()
})
