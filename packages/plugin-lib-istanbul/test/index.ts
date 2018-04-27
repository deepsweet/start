import test from 'tape'

import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '../src'

test('plugin-lib-istanbul: export', (t) => {
  t.equal(
    typeof istanbulInstrument,
    'function',
    'must be a function'
  )

  t.equal(
    typeof istanbulReport,
    'function',
    'must be a function'
  )

  t.equal(
    typeof istanbulThresholds,
    'function',
    'must be a function'
  )

  t.end()
})
