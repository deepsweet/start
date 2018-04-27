import test from 'tape'

import npmVersion from '../src'

test('plugin-lib-npm-version: export', (t) => {
  t.equal(
    typeof npmVersion,
    'function',
    'must be a function'
  )

  t.end()
})
