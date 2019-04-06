import test from 'blue-tape'

import webpackDevServer from '../src'

test('plugin-lib-webpack-dev-server: export', async (t) => {
  t.equals(
    typeof webpackDevServer,
    'function',
    'must be a function'
  )
})
