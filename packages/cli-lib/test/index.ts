import { resolve } from 'path'
import test from 'tape-promise/tape'
import { mock, unmock } from 'mocku'
import { spy, stub } from 'sinon'

test('cli-lib: export', async (t) => {
  const { default: cliLib } = await import('../src/')

  t.equal(
    typeof cliLib,
    'function',
    'must be a function'
  )
})

test('cli-lib: throw without reporter', async (t) => {
  const { default: cliLib } = await import('../src/')

  const options = {}

  return cliLib(options).catch((error) => {
    t.equal(
      error,
      '`reporter` option is missing in your `package.json` → `start`',
      'should throw'
    )
  })
})

test('cli-lib: throw without task name', async (t) => {
  mock('../src/', {
    preset: {
      a: 1,
      b: 2
    }
  })

  const { default: cliLib } = await import('../src/')

  const options = {
    preset: 'preset',
    reporter: 'reporter'
  }

  return cliLib(options).catch((error) => {
    t.equal(
      error,
      'One of the following task names is required:\n* a\n* b',
      'should throw'
    )

    unmock('../src/')
  })
})

test('cli-lib: throw with unknown task name', async (t) => {
  mock('../src/', {
    preset: {
      a: 1,
      b: 2
    }
  })

  const { default: cliLib } = await import('../src/')

  const options = {
    preset: 'preset',
    taskName: 'c',
    reporter: 'reporter'
  }

  return cliLib(options).catch((error) => {
    t.equal(
      error,
      'One of the following task names is required:\n* a\n* b',
      'should throw'
    )

    unmock('../src/')
  })
})

test('cli-lib: default file', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/', {
    [resolve('./tasks')]: {
      task: taskStub
    },
    reporter: {
      default: reporterStub
    }
  })

  const { default: cliLib } = await import('../src/')

  const options = {
    taskName: 'task',
    taskArgs: ['arg1', 'arg2'],
    reporter: 'reporter'
  }

  return cliLib(options).then(() => {
    t.ok(
      taskStub.calledOnceWith('arg1', 'arg2'),
      'should call task with args'
    )

    t.ok(
      taskRunnerSpy.calledOnceWith({ reporter: 'reporter' }),
      'should call taskRunner with props'
    )

    t.ok(
      reporterStub.calledOnceWith('task'),
      'should call reporter with task name'
    )

    unmock('../src/')
  })
})

test('cli-lib: custom file', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/', {
    [resolve('./my-tasks')]: {
      task: taskStub
    },
    reporter: {
      default: reporterStub
    }
  })

  const { default: cliLib } = await import('../src/')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    file: './my-tasks',
    taskName: 'task',
    taskArgs: ['arg1', 'arg2'],
    reporter: 'reporter'
  }

  return cliLib(options).then(() => {
    t.ok(
      taskStub.calledOnceWith('arg1', 'arg2'),
      'should call task with args'
    )

    t.ok(
      taskRunnerSpy.calledOnceWith({ reporter: 'reporter' }),
      'should call taskRunner with props'
    )

    t.ok(
      reporterStub.calledOnceWith('task'),
      'should call reporter with task name'
    )

    unmock('../src/')
  })
})

test('cli-lib: preset', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/', {
    preset: {
      task: taskStub
    },
    reporter: {
      default: reporterStub
    }
  })

  const { default: cliLib } = await import('../src/')

  const options = {
    preset: 'preset',
    taskName: 'task',
    taskArgs: ['arg1', 'arg2'],
    reporter: 'reporter'
  }

  return cliLib(options).then(() => {
    t.ok(
      taskStub.calledOnceWith('arg1', 'arg2'),
      'should call task with args'
    )

    t.ok(
      taskRunnerSpy.calledOnceWith({ reporter: 'reporter' }),
      'should call taskRunner with props'
    )

    t.ok(
      reporterStub.calledOnceWith('task'),
      'should call reporter with task name'
    )

    unmock('../src/')
  })
})
