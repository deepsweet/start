import plugin from '@start/plugin/src/'
import EventEmitter from 'events'
import test from 'blue-tape'
import { createSpy, getSpyCalls } from 'spyfn'

import sequence from '../src'

test('plugin-sequence: export', async (t) => {
  t.equals(
    typeof sequence,
    'function',
    'must be a function'
  )
})

test('plugin-sequence: ok / sync plugin / sync return', async (t) => {
  const reporter = new EventEmitter()
  const plugin1CallbackSpy = createSpy(() => ({ bar: true }))
  const plugin1Spy = createSpy(() => plugin1CallbackSpy)
  const plugin1 = plugin('plugin1', plugin1Spy)
  const plugin2CallbackSpy = createSpy(() => {})
  const plugin2Spy = createSpy(() => plugin2CallbackSpy)
  const plugin2 = plugin('plugin2', plugin2Spy)
  const plugin3CallbackSpy = createSpy(() => {})
  const plugin3Spy = createSpy(() => plugin3CallbackSpy)
  const plugin3 = plugin('plugin3', plugin3Spy)

  const run = await sequence(plugin1, plugin2, plugin3)

  await run(reporter)({ foo: true })

  t.equal(
    getSpyCalls(plugin1Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 1'
  )

  t.deepEqual(
    getSpyCalls(plugin1CallbackSpy),
    [[{ foo: true }]],
    'should pass initial props to plugin 1'
  )

  t.equal(
    getSpyCalls(plugin2Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 2'
  )

  t.deepEqual(
    getSpyCalls(plugin2CallbackSpy),
    [[{ foo: true, bar: true }]],
    'should extend initial props with plugin 1 output and pass it to plugin 2'
  )

  t.equal(
    getSpyCalls(plugin3Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 3'
  )

  t.deepEqual(
    getSpyCalls(plugin3CallbackSpy),
    [[{ foo: true, bar: true }]],
    'should allow plugins to return nothing'
  )
})

test('plugin-sequence: ok / async plugin / async return', async (t) => {
  const reporter = new EventEmitter()
  const plugin1CallbackSpy = createSpy(() => Promise.resolve({ bar: true }))
  const plugin1Spy = createSpy(() => plugin1CallbackSpy)
  const plugin1 = Promise.resolve(plugin('plugin1', plugin1Spy))
  const plugin2CallbackSpy = createSpy(() => Promise.resolve())
  const plugin2Spy = createSpy(() => plugin2CallbackSpy)
  const plugin2 = Promise.resolve(plugin('plugin2', plugin2Spy))
  const plugin3CallbackSpy = createSpy(() => Promise.resolve())
  const plugin3Spy = createSpy(() => plugin3CallbackSpy)
  const plugin3 = Promise.resolve(plugin('plugin3', plugin3Spy))

  const run = await sequence(plugin1, plugin2, plugin3)

  await run(reporter)({ foo: true })

  t.equal(
    getSpyCalls(plugin1Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 1'
  )

  t.deepEqual(
    getSpyCalls(plugin1CallbackSpy),
    [[{ foo: true }]],
    'should pass initial props to plugin 1'
  )

  t.equal(
    getSpyCalls(plugin2Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 2'
  )

  t.deepEqual(
    getSpyCalls(plugin2CallbackSpy),
    [[{ foo: true, bar: true }]],
    'should extend initial props with plugin 1 output and pass it to plugin 2'
  )

  t.equal(
    getSpyCalls(plugin3Spy)[0][0].reporter,
    reporter,
    'should pass reporter through sequence to plugin 3'
  )

  t.deepEqual(
    getSpyCalls(plugin3CallbackSpy),
    [[{ foo: true, bar: true }]],
    'should allow plugins to return nothing'
  )
})

test('plugin-sequence: error / throw', async (t) => {
  const reporter = new EventEmitter()
  const plugin1CallbackSpy = createSpy(() => {
    throw 'oops'
  })
  const plugin1Spy = createSpy(() => plugin1CallbackSpy)
  const plugin1 = plugin('plugin1', plugin1Spy)
  const plugin2CallbackSpy = createSpy(() => {})
  const plugin2Spy = createSpy(() => plugin2CallbackSpy)
  const plugin2 = plugin('plugin2', plugin2Spy)

  const run = await sequence(plugin1, plugin2)

  reporter.on('error', () => {})

  try {
    await run(reporter)()

    t.fail('should not get here')
  } catch (e) {
    t.deepEqual(
      getSpyCalls(plugin2Spy),
      [],
      'should stop running sequence after error'
    )
  }
})

test('plugin-sequence: error / reject', async (t) => {
  const reporter = new EventEmitter()
  const plugin1CallbackSpy = createSpy(() => Promise.reject())
  const plugin1Spy = createSpy(() => plugin1CallbackSpy)
  const plugin1 = plugin('plugin1', plugin1Spy)
  const plugin2CallbackSpy = createSpy(() => {})
  const plugin2Spy = createSpy(() => plugin2CallbackSpy)
  const plugin2 = plugin('plugin2', plugin2Spy)

  const run = await sequence(plugin1, plugin2)

  reporter.on('error', () => {})

  try {
    await run(reporter)()

    t.fail('should not get here')
  } catch (e) {
    t.deepEqual(
      getSpyCalls(plugin2Spy),
      [],
      'should stop running sequence after error'
    )
  }
})

test('plugin-sequence: `false` as a plugin', async (t) => {
  const reporter = new EventEmitter()
  const plugin1 = false
  const plugin2CallbackSpy = createSpy(() => {})
  const plugin2Spy = createSpy(() => plugin2CallbackSpy)
  const plugin2 = plugin('plugin2', plugin2Spy)

  const run = await sequence(plugin1, plugin2)

  await run(reporter)({ foo: true })

  t.deepEqual(
    getSpyCalls(plugin2CallbackSpy),
    [[{ foo: true }]],
    'should allow plugins to return nothing'
  )
})
