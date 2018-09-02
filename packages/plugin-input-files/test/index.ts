import { resolve } from 'path'
import EventEmitter from 'events'
import test from 'tape-promise/tape'
import { stub } from 'sinon'

import inputFiles from '../src'

test('plugin-input-files: export', (t) => {
  t.equal(
    typeof inputFiles,
    'function',
    'must be a function'
  )

  t.end()
})

test('plugin-input-files: simple', async (t) => {
  const reporter = new EventEmitter()
  const targetPluginSpy = stub().returns({ foo: true })
  const files = [
    '../src/index.ts',
    '../test/index.ts'
  ]
  const inputFilesRunner = await inputFiles(targetPluginSpy)(...files)

  const result = await inputFilesRunner({
    files: [],
    reporter
  })

  t.ok(
    targetPluginSpy.calledOnceWith({
      reporter,
      files: files.map((file) => ({
        path: resolve(file),
        data: null,
        map: null
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
  const inputFilesRunner = await inputFiles(targetPluginPromise)(...files)

  const result = await inputFilesRunner({
    files: [],
    reporter
  })

  t.ok(
    targetPluginSpy.calledOnceWith({
      reporter,
      files: files.map((file) => ({
        path: resolve(file),
        data: null,
        map: null
      }))
    }),
    'should call plugin with files and props'
  )

  t.ok(
    result && result.foo,
    'should return called plugin result'
  )
})
