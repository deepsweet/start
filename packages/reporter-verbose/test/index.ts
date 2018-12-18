import test from 'blue-tape'

import reporterVerbose from '../src'

test('reporter-verbose: export', async (t) => {
  t.equals(
    typeof reporterVerbose,
    'function',
    'must be a function'
  )
})
