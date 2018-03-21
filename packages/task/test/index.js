// @flow
import EventEmitter from 'events'
import test from 'tape'
import { spy } from 'sinon'

import type { StartPlugin } from '../src/'
import task from '../src'

class MyEmitter extends EventEmitter {
  __allCallback: (...args: any[]) => void

  emit(...args) {
    this.__allCallback(...args)

    return super.emit(...args)
  }

  onAll(callback) {
    this.__allCallback = callback
  }
}

test('export', (t) => {
  t.equal(typeof task, 'function', 'must be a function')
  t.end()
})

test('resolve', (t) => {
  const taskName = 'taskName'
  const initialInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1Spy = spy()
  const testPlugin1: StartPlugin = () => {
    testPlugin1Spy()

    return Promise.resolve([])
  }
  const testPlugin2Spy = spy()
  const testPlugin2: StartPlugin = () => {
    testPlugin2Spy()

    return Promise.resolve([])
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName, input: initialInput })
    .then(() => {
      t.true(testPlugin1Spy.calledOnce, 'test plugin 1 must be called once')
      t.true(testPlugin2Spy.calledOnce, 'test plugin 2 must be called once')
      t.equal(reporterSpy.callCount, 6, 'reporter events must be fired 6 times')
      t.true(
        reporterSpy.getCall(0).calledWith('task:start', {
          taskName,
          plugins: ['testPlugin1', 'testPlugin2'],
        }),
        'task:start'
      )
      t.true(
        reporterSpy.getCall(1).calledWith('plugin:start', {
          taskName,
          pluginName: 'testPlugin1',
        }),
        'plugin:start'
      )
      t.true(
        reporterSpy.getCall(2).calledWith('plugin:done', {
          taskName,
          pluginName: 'testPlugin1',
        }),
        'plugin:done'
      )
      t.true(
        reporterSpy.getCall(3).calledWith('plugin:start', {
          taskName,
          pluginName: 'testPlugin2',
        }),
        'plugin:start'
      )
      t.true(
        reporterSpy.getCall(4).calledWith('plugin:done', {
          taskName,
          pluginName: 'testPlugin2',
        }),
        'plugin:done'
      )
      t.true(
        reporterSpy.getCall(5).calledWith('task:done', {
          taskName,
        }),
        'task:done'
      )
      t.end()
    })
    .catch(t.end)
})

test('reject', (t) => {
  const taskName = 'taskName'
  const initialInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1Spy = spy()
  const testPlugin1: StartPlugin = () => {
    testPlugin1Spy()

    return Promise.reject('oopsie')
  }
  const testPlugin2Spy = spy()
  const testPlugin2: StartPlugin = () => {
    testPlugin2Spy()

    return Promise.resolve([])
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName, input: initialInput }).catch(() => {
    t.true(testPlugin1Spy.calledOnce, 'test plugin 1 must be called once')
    t.equal(testPlugin2Spy.callCount, 0, 'test plugin 2 must be not called')
    t.equal(reporterSpy.callCount, 4, 'reporter events must be fired 6 times')
    t.true(
      reporterSpy.getCall(0).calledWith('task:start', {
        taskName,
        plugins: ['testPlugin1', 'testPlugin2'],
      }),
      'task:start'
    )
    t.true(
      reporterSpy.getCall(1).calledWith('plugin:start', {
        taskName,
        pluginName: 'testPlugin1',
      }),
      'plugin:start'
    )
    t.true(
      reporterSpy.getCall(2).calledWith('plugin:error', {
        taskName,
        pluginName: 'testPlugin1',
        error: 'oopsie',
      }),
      'plugin:error'
    )
    t.true(
      reporterSpy.getCall(3).calledWith('task:error', {
        taskName,
      }),
      'task:error'
    )
    t.end()
  })
})

test('throw', (t) => {
  const taskName = 'taskName'
  const testError = new Error('oopsie')
  const initialInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1: StartPlugin = () => {
    throw testError
  }
  const testPlugin2Spy = spy()
  const testPlugin2: StartPlugin = () => {
    testPlugin2Spy()

    return Promise.resolve([])
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName, input: initialInput }).catch(() => {
    t.equal(testPlugin2Spy.callCount, 0, 'test plugin 2 must be not called')
    t.equal(reporterSpy.callCount, 4, 'reporter events must be fired 6 times')
    t.true(
      reporterSpy.getCall(0).calledWith('task:start', {
        taskName,
        plugins: ['testPlugin1', 'testPlugin2'],
      }),
      'task:start'
    )
    t.true(
      reporterSpy.getCall(1).calledWith('plugin:start', {
        taskName,
        pluginName: 'testPlugin1',
      }),
      'plugin:start'
    )
    t.true(
      reporterSpy.getCall(2).calledWith('plugin:error', {
        taskName,
        pluginName: 'testPlugin1',
        error: testError,
      }),
      'plugin:error'
    )
    t.true(
      reporterSpy.getCall(3).calledWith('task:error', {
        taskName,
      }),
      'task:error'
    )
    t.end()
  })
})

test('input', (t) => {
  const taskName = 'taskName'
  const customInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1Spy = spy()
  const testPlugin1: StartPlugin = ({ input }) => {
    testPlugin1Spy(input)

    return Promise.resolve(customInput)
  }
  const testPlugin2Spy = spy()
  const testPlugin2: StartPlugin = ({ input }) => {
    testPlugin2Spy(input)

    return Promise.resolve(customInput)
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName })
    .then((input) => {
      t.true(
        testPlugin1Spy.getCall(0).calledWith([]),
        'test plugin 1 must be called with default input'
      )
      t.true(
        testPlugin2Spy.getCall(0).calledWith(customInput),
        'test plugin 2 must be called with custom input'
      )
      t.equal(input, customInput, 'task must be resolved with custom input')
      t.end()
    })
    .catch(t.end)
})

test('logMessage', (t) => {
  const taskName = 'taskName'
  const initialInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1: StartPlugin = ({ logMessage }) => {
    logMessage('message 1')

    return Promise.resolve([])
  }
  const testPlugin2: StartPlugin = ({ logMessage }) => {
    logMessage('message 2')

    return Promise.resolve([])
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName, input: initialInput })
    .then(() => {
      t.equal(reporterSpy.callCount, 8, 'reporter events must be fired 8 times')
      t.true(
        reporterSpy.getCall(2).calledWith('plugin:log:message', {
          taskName,
          pluginName: 'testPlugin1',
          message: 'message 1',
        }),
        'plugin:log:message'
      )
      t.true(
        reporterSpy.getCall(5).calledWith('plugin:log:message', {
          taskName,
          pluginName: 'testPlugin2',
          message: 'message 2',
        }),
        'plugin:log:message'
      )
      t.end()
    })
    .catch(t.end)
})

test('logPath', (t) => {
  const taskName = 'taskName'
  const initialInput = [{ path: 'test', data: null, map: null }]
  const testPlugin1: StartPlugin = ({ logPath }) => {
    logPath('path 1')

    return Promise.resolve([])
  }
  const testPlugin2: StartPlugin = ({ logPath }) => {
    logPath('path 2')

    return Promise.resolve([])
  }

  const reporter = new MyEmitter()
  const reporterSpy = spy()

  reporter.onAll(reporterSpy)

  task(reporter)(testPlugin1, testPlugin2)({ taskName, input: initialInput })
    .then(() => {
      t.equal(reporterSpy.callCount, 8, 'reporter events must be fired 8 times')
      t.true(
        reporterSpy.getCall(2).calledWith('plugin:log:path', {
          taskName,
          pluginName: 'testPlugin1',
          message: 'path 1',
        }),
        'plugin:log:path'
      )
      t.true(
        reporterSpy.getCall(5).calledWith('plugin:log:path', {
          taskName,
          pluginName: 'testPlugin2',
          message: 'path 2',
        }),
        'plugin:log:path'
      )
      t.end()
    })
    .catch(t.end)
})
