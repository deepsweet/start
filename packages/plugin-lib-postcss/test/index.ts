import test from 'tape'

import postcss from '../src'

test('plugin-lib-postcss: export', (t) => {
  t.equal(
    typeof postcss,
    'function',
    'must be a function'
  )

  t.end()
})
