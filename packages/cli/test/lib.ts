import test from 'tape'

import cliLib from '../src/lib'

test('cli: export', (t) => {
  t.equal(
    typeof cliLib,
    'function',
    'must be a function'
  )

  t.end()
})
