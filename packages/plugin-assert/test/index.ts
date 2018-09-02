import EventEmitter from 'events'
import test from 'tape-promise/tape'
import { spy } from 'sinon'

import assert from '../src'

const files = [{
  path: 'test',
  data: null,
  map: null
}]

test('plugin-assert: export', (t) => {
  t.equal(
    typeof assert,
    'function',
    'must be a function'
  )

  t.end()
})

test('plugin-assert: throw with default message', async (t) => {
  const reporter = new EventEmitter()
  const onErrorSpy = spy()
  const assertRunner = await assert(false)

  reporter.on('error', onErrorSpy)

  try {
    await assertRunner({ files, reporter })
  } catch (error) {
    t.ok(
      onErrorSpy.calledOnce,
      'should throw assert error only once'
    )

    t.ok(
      onErrorSpy.calledWithMatch(
        'assert',
        { actual: false, expected: true }
      ),
      'should throw assert error'
    )
  }
})

test('plugin-assert: throw with custom message', async (t) => {
  const reporter = new EventEmitter()
  const onErrorSpy = spy()
  const assertRunner = await assert(false, 'should be true!')

  reporter.on('error', onErrorSpy)

  try {
    await assertRunner({ files, reporter })
  } catch (error) {
    t.ok(
      onErrorSpy.calledOnce,
      'should throw assert error only once'
    )

    t.ok(
      onErrorSpy.calledWithMatch(
        'assert',
        { message: 'should be true!' }
      ),
      'should throw assert error'
    )
  }
})
