import { StartPlugin } from '@start/plugin/src/'
import EventEmitter from 'events'
import test from 'tape'
import { stub } from 'sinon'

import sequence from '../src'

const files = [
  {
    path: 'foo',
    data: 'bar',
    map: null
  }
]

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
    files,
    reporter: new EventEmitter()
  }
  const plugin1 = stub().returns(files)
  const plugin2 = stub().returns(files)

  const result = await sequence(plugin1, plugin2)(props)

  t.ok(
    plugin1.calledOnceWith(props),
    'plugin1 should be called with props'
  )

  t.ok(
    plugin2.calledOnceWith(props),
    'plugin2 should be called with props'
  )

  t.deepEqual(
    result,
    files,
    'result of sequence should be equal files'
  )

  t.end()
})

test('plugin-sequence: ok / promise output', async (t) => {
  const props = {
    files,
    reporter: new EventEmitter()
  }
  const plugin1 = stub().resolves(files)
  const plugin2 = stub().resolves(files)

  const result = await sequence(plugin1, plugin2)(props)

  t.ok(
    plugin1.calledOnceWith(props),
    'plugin1 should be called with props'
  )

  t.ok(
    plugin2.calledOnceWith(props),
    'plugin2 should be called with props'
  )

  t.deepEqual(
    result,
    files,
    'result of sequence should be equal files'
  )

  t.end()
})

test('plugin-sequence: error / throw', async (t) => {
  const props = {
    files,
    reporter: new EventEmitter()
  }
  const plugin1 = stub().throws(new Error('oops'))
  const plugin2 = stub().returns(files)

  try {
    await sequence(plugin1, plugin2)(props)
  } catch (error) {
    t.ok(
      plugin1.calledOnceWith(props),
      'plugin1 should be called with props'
    )

    t.ok(
      plugin2.notCalled,
      'plugin2 should not be called'
    )

    t.end()
  }
})

test('plugin-sequence: error / reject', async (t) => {
  const props = {
    files,
    reporter: new EventEmitter()
  }
  const plugin1 = stub().rejects(new Error('oops'))
  const plugin2 = stub().returns(files)

  try {
    await sequence(plugin1, plugin2)(props)
  } catch (error) {
    t.ok(
      plugin1.calledOnceWith(props),
      'plugin1 should be called with props'
    )

    t.ok(
      plugin2.notCalled,
      'plugin2 should not be called'
    )

    t.end()
  }
})
