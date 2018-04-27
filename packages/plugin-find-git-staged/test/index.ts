import test from 'tape'

import findGitStaged from '../src'

test('plugin-findGitStaged: export', (t) => {
  t.equal(
    typeof findGitStaged,
    'function',
    'must be a function'
  )

  t.end()
})
