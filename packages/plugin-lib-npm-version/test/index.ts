import test from 'blue-tape'

import npmVersion from '../src'

test('plugin-lib-npm-version: export', async (t) => {
  t.equals(
    typeof npmVersion,
    'function',
    'must be a function'
  )
})
