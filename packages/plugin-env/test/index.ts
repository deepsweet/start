import EventEmitter from 'events'
import test from 'blue-tape'
import { createSpy, getSpyCalls } from 'spyfn'

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
  const reporter = new EventEmitter()
  const envRunner = await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  await envRunner(reporter)()

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
  const onMessageSpy = createSpy(() => {})

  reporter.on('message', onMessageSpy)

  const envRunner = await env({
    FOO: 'BAR',
    BEEP: 'BOOP'
  })

  await envRunner(reporter)({ files })

  t.equals(
    getSpyCalls(onMessageSpy).length,
    2,
    'should log twice'
  )

  t.deepEquals(
    getSpyCalls(onMessageSpy),
    [
      ['env', 'FOO = BAR'],
      ['env', 'BEEP = BOOP']
    ],
    'should log first message'
  )
})
