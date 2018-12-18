import { resolve } from 'path'
import EventEmitter from 'events'
import test from 'blue-tape'
import { stub } from 'sinon'
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
  const targetPluginSpy = stub().returns({ foo: true })
  const files = [
    '../src/index.ts',
    '../test/index.ts'
  ]
  const inputFilesRunner = await inputFiles<{ foo: boolean }>(targetPluginSpy)(...files)
  const utils = { reporter, logPath: () => {}, logMessage: () => {} }

  const result = await inputFilesRunner(utils)({ files: [] })

  t.ok(
    targetPluginSpy.calledOnceWith({
      reporter,
      files: files.map((file): StartFile => ({
        path: resolve(file)
      }))
    }),
    'should call plugin with files and props'
  )

  t.ok(
    result && result.foo,
    'should return called plugin result'
  )
})

test('plugin-input-files: async plugin', async (t) => {
  const reporter = new EventEmitter()
  const targetPluginSpy = stub().returns({ foo: true })
  const targetPluginPromise = Promise.resolve(targetPluginSpy)
  const files = [
    '../src/index.ts',
    '../test/index.ts'
  ]
  const inputFilesRunner = await inputFiles<{ foo: boolean }>(targetPluginPromise)(...files)
  const utils = { reporter, logPath: () => {}, logMessage: () => {} }

  const result = await inputFilesRunner(utils)({ files: [] })

  t.ok(
    targetPluginSpy.calledOnceWith({
      reporter,
      files: files.map((file): StartFile => ({
        path: resolve(file)
      }))
    }),
    'should call plugin with files and props'
  )

  t.ok(
    result && result.foo,
    'should return called plugin result'
  )
})
