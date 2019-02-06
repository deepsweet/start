import EventEmitter from 'events'
import test from 'blue-tape'
import { createSpy, getSpyCalls } from 'spyfn'

import plugin from '../src'

test('plugin: export', async (t) => {
  t.equals(
    typeof plugin,
    'function',
    'must be a function'
  )
})

test('plugin: utils and props', async (t) => {
  const reporter = new EventEmitter()
  const pluginCallbackSpy = createSpy(() => ({ bar: true }))
  const pluginSpy = createSpy(() => pluginCallbackSpy)
  const pluginRunner = await plugin('plugin', pluginSpy)
  const result = await pluginRunner(reporter)({ foo: true })

  t.deepEqual(
    getSpyCalls(pluginSpy)[0][0].reporter,
    reporter,
    'should pass reporter to plugin utils'
  )

  t.deepEqual(
    getSpyCalls(pluginCallbackSpy),
    [[{ foo: true }]],
    'should pass props to plugin'
  )

  t.deepEqual(
    result,
    { bar: true },
    'should return output props'
  )
})

test('plugin: done', async (t) => {
  const reporter = new EventEmitter()
  const pluginRunner = await plugin('plugin', () => () => {})
  const eventStartSpy = createSpy(() => {})
  const eventDoneSpy = createSpy(() => {})

  await pluginRunner(reporter)()

  reporter.on('start', eventStartSpy)
  reporter.on('done', eventDoneSpy)

  await pluginRunner(reporter)()

  t.deepEqual(
    getSpyCalls(eventStartSpy),
    [[ 'plugin' ]],
    'should emit `start` event'
  )

  t.deepEqual(
    getSpyCalls(eventDoneSpy),
    [[ 'plugin' ]],
    'should emit `done` event'
  )
})

test('plugin: hard error', async (t) => {
  const reporter = new EventEmitter()
  const pluginRunner = await plugin('plugin', () => () => {
    throw 'oops'
  })
  const eventStartSpy = createSpy(() => {})
  const eventErrorSpy = createSpy(() => {})

  reporter.on('start', eventStartSpy)
  reporter.on('error', eventErrorSpy)

  try {
    await pluginRunner(reporter)()

    t.fail('should not get here')
  } catch (e) {
    t.deepEqual(
      getSpyCalls(eventStartSpy),
      [[ 'plugin' ]],
      'should emit `start` event'
    )

    t.deepEqual(
      getSpyCalls(eventErrorSpy),
      [[ 'plugin', 'oops' ]],
      'should emit `done` event'
    )
  }
})

test('plugin: reject', async (t) => {
  const reporter = new EventEmitter()
  const pluginRunner = await plugin('plugin', () => () => Promise.reject('oops'))
  const eventStartSpy = createSpy(() => {})
  const eventErrorSpy = createSpy(() => {})

  reporter.on('start', eventStartSpy)
  reporter.on('error', eventErrorSpy)

  try {
    await pluginRunner(reporter)()

    t.fail('should not get here')
  } catch (e) {
    t.deepEqual(
      getSpyCalls(eventStartSpy),
      [[ 'plugin' ]],
      'should emit `start` event'
    )

    t.deepEqual(
      getSpyCalls(eventErrorSpy),
      [[ 'plugin', 'oops' ]],
      'should emit `done` event'
    )
  }
})

test('plugin: log message', async (t) => {
  const reporter = new EventEmitter()
  const pluginRunner = await plugin('plugin', ({ logMessage }) => () => {
    logMessage('hi')
  })
  const eventMessageSpy = createSpy(() => {})

  await pluginRunner(reporter)()

  reporter.on('message', eventMessageSpy)

  await pluginRunner(reporter)()

  t.deepEqual(
    getSpyCalls(eventMessageSpy),
    [[ 'plugin', 'hi' ]],
    'should emit `message` event'
  )
})

test('plugin: log path', async (t) => {
  const reporter = new EventEmitter()
  const pluginRunner = await plugin('plugin', ({ logPath }) => () => {
    logPath('path/to/file')
  })
  const eventPathSpy = createSpy(() => {})

  await pluginRunner(reporter)()

  reporter.on('path', eventPathSpy)

  await pluginRunner(reporter)()

  t.deepEqual(
    getSpyCalls(eventPathSpy),
    [[ 'plugin', 'path/to/file' ]],
    'should emit `path` event'
  )
})
