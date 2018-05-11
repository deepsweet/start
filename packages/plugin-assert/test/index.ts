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

  reporter.on('error', onErrorSpy)

  try {
    await assert(false)({ files, reporter })
  } catch (error) {
    t.ok(
      onErrorSpy.calledOnce,
      'should throw assert error only once'
    )

    t.ok(
      onErrorSpy.calledWithMatch(
        'assert',
        { code: 'ERR_ASSERTION', message: 'false == true' }
      ),
      'should throw assert error'
    )
  }
})

test('plugin-assert: throw with custom message', async (t) => {
  const reporter = new EventEmitter()
  const onErrorSpy = spy()

  reporter.on('error', onErrorSpy)

  try {
    await assert(false, 'should be true!')({ files, reporter })
  } catch (error) {
    t.ok(
      onErrorSpy.calledOnce,
      'should throw assert error only once'
    )

    t.ok(
      onErrorSpy.calledWithMatch(
        'assert',
        { code: 'ERR_ASSERTION', message: 'should be true!' }
      ),
      'should throw assert error'
    )
  }
})

test('plugin-assert: files', async (t) => {
  const reporter = new EventEmitter()
  const result = await assert(true)({ files, reporter })

  t.deepEqual(
    result,
    files,
    'should pass `files` through'
  )
})
