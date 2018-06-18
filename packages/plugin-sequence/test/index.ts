import { StartPlugin } from '@start/plugin/src/'
import EventEmitter from 'events'
import test from 'tape-promise/tape'
import { stub } from 'sinon'

import sequence from '../src'

test('plugin-sequence: export', (t) => {
  t.equal(
    typeof sequence,
    'function',
    'must be a function'
  )

  t.end()
})

test('plugin-sequence: ok / sync output', async (t) => {
  const props = {
    reporter: new EventEmitter()
  }
  const plugin1 = stub().returns({ foo: true })
  const plugin2 = stub().returns({ bar: true })
  const plugin3 = stub().returns()

  const run = await sequence(plugin1, plugin2, plugin3)

  await run(props)

  t.ok(
    plugin1.calledWithMatch(props),
    'plugin1 should be called with initial props'
  )

  t.ok(
    plugin2.calledWithMatch({ foo: true }),
    'plugin2 should be called with plugin 1 result'
  )

  t.ok(
    plugin3.calledWithMatch({ bar: true }),
    'plugin3 should be called with plugin 2 result'
  )
})

test('plugin-sequence: ok / promise output', async (t) => {
  const props = {
    reporter: new EventEmitter()
  }
  const plugin1 = stub().resolves({ foo: true })
  const plugin2 = stub().resolves({ bar: true })
  const plugin3 = stub().resolves()

  const run = await sequence(plugin1, plugin2, plugin3)
  const result = await run(props)

  t.ok(
    plugin1.calledWithMatch(props),
    'plugin1 should be called with initial props'
  )

  t.ok(
    plugin2.calledWithMatch({ foo: true }),
    'plugin2 should be called with plugin 1 result'
  )

  t.ok(
    plugin3.calledWithMatch({ bar: true }),
    'plugin3 should be called with plugin 2 result'
  )
})

test('plugin-sequence: ok / promise plugin / promise output', async (t) => {
  const props = {
    reporter: new EventEmitter()
  }
  const plugin1 = stub().resolves({ foo: true })
  const plugin1Promise = Promise.resolve(plugin1)
  const plugin2 = stub().resolves({ bar: true })
  const plugin2Promise = Promise.resolve(plugin2)
  const plugin3 = stub().resolves()
  const plugin3Promise = Promise.resolve(plugin3)

  const run = await sequence(plugin1Promise, plugin2Promise, plugin3Promise)
  const result = await run(props)

  t.ok(
    plugin1.calledWithMatch(props),
    'plugin1 should be called with initial props'
  )

  t.ok(
    plugin2.calledWithMatch({ foo: true }),
    'plugin2 should be called with plugin 1 result'
  )

  t.ok(
    plugin3.calledWithMatch({ bar: true }),
    'plugin3 should be called with plugin 2 result'
  )
})

test('plugin-sequence: error / throw', async (t) => {
  const props = {
    reporter: new EventEmitter()
  }
  const plugin1 = stub().throws(new Error('oops'))
  const plugin2 = stub().returns()

  try {
    const run = await sequence(plugin1, plugin2)

    await run(props)
  } catch (error) {
    t.ok(
      plugin1.calledWithMatch(props),
      'plugin1 should be called with props'
    )

    t.ok(
      plugin2.notCalled,
      'plugin2 should not be called'
    )
  }
})

test('plugin-sequence: error / reject', async (t) => {
  const props = {
    reporter: new EventEmitter()
  }
  const plugin1 = stub().rejects(new Error('oops'))
  const plugin2 = stub().returns()

  try {
    const run = await sequence(plugin1, plugin2)

    await run(props)
  } catch (error) {
    t.ok(
      plugin1.calledWithMatch(props),
      'plugin1 should be called with props'
    )

    t.ok(
      plugin2.notCalled,
      'plugin2 should not be called'
    )
  }
})
