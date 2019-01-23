import EventEmitter from 'events'
import test from 'blue-tape'
import { createSpy, getSpyCalls } from 'spyfn'

import assert from '../src'

test('plugin-assert: export', async (t) => {
  t.equals(
    typeof assert,
    'function',
    'must be a function'
  )
})

test('plugin-assert: throw with default message', async (t) => {
  const reporter = new EventEmitter()
  const onErrorSpy = createSpy(() => {})
  const assertRunner = await assert(false)

  reporter.on('error', onErrorSpy)

  try {
    await assertRunner(reporter)()
  } catch (error) {
    t.equals(
      getSpyCalls(onErrorSpy).length,
      1,
      'should throw assert error only once'
    )

    t.equals(
      getSpyCalls(onErrorSpy).length,
      1,
      'should throw assert error'
    )
  }
})

test('plugin-assert: throw with custom message', async (t) => {
  const reporter = new EventEmitter()
  const onErrorSpy = createSpy(() => {})
  const assertRunner = await assert(false, 'should be true!')

  reporter.on('error', onErrorSpy)

  try {
    await assertRunner(reporter)()
  } catch (error) {
    t.equals(
      getSpyCalls(onErrorSpy).length,
      1,
      'should throw assert error only once'
    )

    t.equals(
      getSpyCalls(onErrorSpy).length,
      1,
      'should throw assert error'
    )
  }
})
