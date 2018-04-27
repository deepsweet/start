import test from 'tape'

import prettierEslint from '../src'

test('plugin-lib-prettier-eslint: export', (t) => {
  t.equal(
    typeof prettierEslint,
    'function',
    'must be a function'
  )

  t.end()
})
