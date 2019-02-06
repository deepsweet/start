import test from 'blue-tape'

import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '../src'

test('plugin-lib-istanbul: export', async (t) => {
  t.equals(
    typeof istanbulInstrument,
    'function',
    'must be a function'
  )

  t.equals(
    typeof istanbulReport,
    'function',
    'must be a function'
  )

  t.equals(
    typeof istanbulThresholds,
    'function',
    'must be a function'
  )
})
