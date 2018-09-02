import EventEmitter from 'events'
import test from 'tape-promise/tape'
import { spy } from 'sinon'

import env from '../src'

const files = [{
  path: 'test',
  data: null,
  map: null
}]

test('plugin-env: export', (t) => {
  t.equal(
    typeof env,
    'function',
    'must be a function'
  )

  t.end()
})

test('plugin-env: process.env', async (t) => {
  await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  t.equal(
    process.env.FOO,
    'BAR',
    'should set process.env'
  )

  t.equal(
    process.env.BEEP,
    'BOOP',
    'should set process.env'
  )

  t.end()
})

test('plugin-env: message', async (t) => {
  const reporter = new EventEmitter()
  const onMessageSpy = spy()

  reporter.on('message', onMessageSpy)

  const envRunner = await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  await envRunner({ files, reporter })

  t.ok(
    onMessageSpy.calledTwice,
    'should log twice'
  )

  t.ok(
    onMessageSpy.firstCall.calledWith('env', 'FOO = BAR'),
    'should log first message'
  )

  t.ok(
    onMessageSpy.secondCall.calledWith('env', 'BEEP = BOOP'),
    'should log second message'
  )
})
