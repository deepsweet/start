import test from 'tape'

import reporterVerbose from '../src'

test('reporter-verbose: export', (t) => {
  t.equal(
    typeof reporterVerbose,
    'function',
    'must be a function'
  )

  t.end()
})
