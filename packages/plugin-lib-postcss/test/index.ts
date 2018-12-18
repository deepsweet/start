import test from 'blue-tape'

import postcss from '../src'

test('plugin-lib-postcss: export', async (t) => {
  t.equals(
    typeof postcss,
    'function',
    'must be a function'
  )
})
