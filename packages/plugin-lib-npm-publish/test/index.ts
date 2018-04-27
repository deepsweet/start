import test from 'tape'

import npmPublish from '../src'

test('plugin-lib-npm-publish: export', (t) => {
  t.equal(
    typeof npmPublish,
    'function',
    'must be a function'
  )

  t.end()
})
