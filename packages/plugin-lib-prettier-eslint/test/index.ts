import test from 'blue-tape'

import prettierEslint from '../src'

test('plugin-lib-prettier-eslint: export', async (t) => {
  t.equals(
    typeof prettierEslint,
    'function',
    'must be a function'
  )
})
