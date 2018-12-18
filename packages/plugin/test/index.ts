import EventEmitter from 'events'
import test from 'blue-tape'
import { spy, stub } from 'sinon'

import plugin, { StartPluginUtils } from '../src'

const files = [
  {
    path: 'foo',
    data: 'bar',
    map: null
  }
]

test('plugin: export', async (t) => {
  t.equals(
    typeof plugin,
    'function',
    'must be a function'
  )
})

test('plugin: props', async (t) => {
  const name = 'testName'
  const pluginFn = stub().returns({ bar: true })
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const beforeProps = { foo: true }
  const pluginRunner = await plugin(name, pluginFn)

  const result = await pluginRunner(utils)(beforeProps)

  t.ok(
    pluginFn.calledOnce,
    'plugin function should be called once'
  )

  const afterProps = pluginFn.firstCall.args[0]

  t.ok(
    afterProps.foo,
    'props should be passed through'
  )

  t.deepEqual(
    afterProps.reporter,
    reporter,
    '`reporter` should be passed through'
  )

  t.equals(
    typeof afterProps.logMessage,
    'function',
    '`logMessage` should be a function'
  )

  t.equals(
    typeof afterProps.logFile,
    'function',
    '`logFile` should be a function'
  )

  t.deepEqual(
    result,
    {
      foo: true,
      bar: true,
      reporter
    },
    'should extend result with returned props'
  )
})

test('plugin: no return', async (t) => {
  const name = 'testName'
  const pluginFn = stub().returns(null)
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const beforeProps = { foo: true }
  const pluginRunner = await plugin(name, pluginFn)

  const result = await pluginRunner(utils)(beforeProps)

  t.deepEqual(
    result,
    beforeProps,
    'should return the same'
  )
})

test('plugin: done', async (t) => {
  const name = 'testName'
  const pluginFn = stub().returns(files)
  const eventStartSpy = spy()
  const eventDoneSpy = spy()
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const props = { files }
  const pluginRunner = await plugin(name, pluginFn)

  reporter.on('start', eventStartSpy)
  reporter.on('done', eventDoneSpy)

  await pluginRunner(utils)(props)

  t.ok(
    eventStartSpy.calledOnceWith(name),
    'should emit `start` event'
  )

  t.ok(
    eventDoneSpy.calledOnceWith(name),
    'should emit `done` event'
  )
})

test('plugin: error', async (t) => {
  const name = 'testName'
  const testError = new Error('oops')
  const pluginFn = stub().throws(testError)
  const eventStartSpy = spy()
  const eventErrorSpy = spy()
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const props = { files }
  const pluginRunner = await plugin(name, pluginFn)

  reporter.on('start', eventStartSpy)
  reporter.on('error', eventErrorSpy)

  try {
    await pluginRunner(utils)(props)
  } catch (error) {
    t.equals(
      error,
      null,
      'should swallow original error'
    )

    t.ok(
      eventStartSpy.calledOnceWith(name),
      'should emit `start` event'
    )

    t.ok(
      eventErrorSpy.calledOnceWith(name, testError),
      'should emit `error` event'
    )
  }
})

test('plugin: log message', async (t) => {
  const name = 'testName'
  const message = 'hello'
  const pluginFn = stub().callsFake(({ logMessage }) => {
    logMessage(message)

    return files
  })
  const eventMessageSpy = spy()
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const props = { files }
  const pluginRunner = await plugin(name, pluginFn)

  reporter.on('message', eventMessageSpy)

  await pluginRunner(utils)(props)

  t.ok(
    eventMessageSpy.calledOnceWith(name, message),
    'should emit `message` event'
  )
})

test('plugin: log file', async (t) => {
  const name = 'testName'
  const filePath = 'file/path'
  const pluginFn = stub().callsFake(({ logFile }) => {
    logFile(filePath)

    return files
  })
  const eventFileSpy = spy()
  const reporter = new EventEmitter()
  const utils: StartPluginUtils = { reporter, logPath: () => {}, logMessage: () => {} }
  const props = { files }
  const pluginRunner = await plugin(name, pluginFn)

  reporter.on('file', eventFileSpy)

  await pluginRunner(utils)(props)

  t.ok(
    eventFileSpy.calledOnceWith(name, filePath),
    'should emit `file` event'
  )
})
