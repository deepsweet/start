import test from 'tape'

import inputFiles from '../src'

test('plugin-inputFiles: export', (t) => {
  t.equal(
    typeof inputFiles,
    'function',
    'must be a function'
  )

  t.end()
})
