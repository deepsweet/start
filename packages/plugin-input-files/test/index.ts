import { resolve } from 'path'
import EventEmitter from 'events'
import test from 'blue-tape'
import { createSpy, getSpyCalls } from 'spyfn'
import { StartFile } from '@start/plugin/src'

import inputFiles from '../src'

test('plugin-input-files: export', async (t) => {
  t.equals(
    typeof inputFiles,
    'function',
    'must be a function'
  )
})

test('plugin-input-files: simple', async (t) => {
  const reporter = new EventEmitter()
  const pluginSpy = createSpy(() => ({ foo: true }))
  const targetPluginSpy = createSpy(() => pluginSpy)
  const files = [
    '../src/index.ts',
    '../test/index.ts'
  ]

  const inputFilesRunner = await inputFiles<{ foo: boolean }>(targetPluginSpy)(...files)

  const result = await inputFilesRunner(reporter)({ files: [] })

  t.deepEquals(
    getSpyCalls(targetPluginSpy),
    [[reporter]],
    'shoudl be called with reporter'
  )

  t.deepEquals(
    getSpyCalls(pluginSpy),
    [[{
      files: files.map((file): StartFile => ({
        path: resolve(file)
      }))
    }]],
    'should call plugin with files and props'
  )

  t.ok(
    result && result.foo,
    'should return called plugin result'
  )
})

test('plugin-input-files: async plugin', async (t) => {
  const reporter = new EventEmitter()
  const targetSpy = createSpy(() => ({ foo: true }))
  const targetPluginSpy = createSpy(() => targetSpy)
  const targetPluginPromise = Promise.resolve(targetPluginSpy)
  const files = [
    '../src/index.ts',
    '../test/index.ts'
  ]
  const inputFilesRunner = await inputFiles<{ foo: boolean }>(targetPluginPromise)(...files)

  const result = await inputFilesRunner(reporter)({ files: [] })

  t.deepEquals(
    getSpyCalls(targetPluginSpy),
    [[reporter]],
    'shoudl be called with reporter'
  )

  t.deepEquals(
    getSpyCalls(targetSpy),
    [[{
      files: files.map((file): StartFile => ({
        path: resolve(file)
      }))
    }]],
    'should call plugin with files and props'
  )

  t.ok(
    result && result.foo,
    'should return called plugin result'
  )
})
