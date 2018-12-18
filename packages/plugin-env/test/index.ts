import EventEmitter from 'events'
import test from 'blue-tape'
import { spy } from 'sinon'

import env from '../src'

const files = [{
  path: 'test',
  data: null,
  map: null
}]

test('plugin-env: export', async (t) => {
  t.equals(
    typeof env,
    'function',
    'must be a function'
  )
})

test('plugin-env: process.env', async (t) => {
  const utils = {
    reporter: new EventEmitter(),
    logPath: () => {},
    logMessage: () => {}
  }
  const envRunner = await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  await envRunner(utils)()

  t.equals(
    process.env.FOO,
    'BAR',
    'should set process.env'
  )

  t.equals(
    process.env.BEEP,
    'BOOP',
    'should set process.env'
  )
})

test('plugin-env: message', async (t) => {
  const reporter = new EventEmitter()
  const utils = { reporter, logPath: () => {}, logMessage: () => {} }
  const onMessageSpy = spy()

  reporter.on('message', onMessageSpy)

  const envRunner = await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  await envRunner(utils)({ files })

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
