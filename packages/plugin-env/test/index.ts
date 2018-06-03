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

test('plugin-env: process.env', (t) => {
  env('FOO', 'BAR')

  t.equal(
    process.env.FOO,
    'BAR',
    'should set process.env'
  )

  t.end()
})

test('plugin-env: env object', (t) => {
  let mockEnv = { BAR: 'BAZ' }
  env(mockEnv)

  t.equal(
    process.env.BAR,
    'BAZ',
    'should set process.env with a object'
  )

  t.end()
})

test('plugin-env: files', async (t) => {
  const reporter = new EventEmitter()
  const run = env('FOO', 'BAR')
  const result = await run({ files, reporter })

  t.deepEqual(
    result,
    files,
    'should pass `files` through'
  )
})

test('plugin-env: message', async (t) => {
  const reporter = new EventEmitter()
  const onMessageSpy = spy()

  reporter.on('message', onMessageSpy)

  const run = env('FOO', 'BAR')
  const result = await run({ files, reporter })

  t.ok(
    onMessageSpy.calledOnceWith('env', 'FOO = BAR'),
    'should log message'
  )
})

