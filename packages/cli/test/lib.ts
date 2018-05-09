import { resolve } from 'path'
import test from 'tape'
import { mock, unmock } from 'mocku'
import { spy, stub } from 'sinon'

test('cli: export', async (t) => {
  const { default: cliLib } = await import('../src/lib')

  t.equal(
    typeof cliLib,
    'function',
    'must be a function'
  )

  t.end()
})

test('cli: throw without reporter', async (t) => {
  const { default: cliLib } = await import('../src/lib')

  const argv = []
  const options = {}

  cliLib(argv, options).catch((error) => {
    t.equal(
      error,
      '`reporter` option is missing in your `package.json` → `start`',
      'should throw'
    )

    t.end()
  })
})

test('cli: throw without task name', async (t) => {
  mock('../src/lib', {
    preset: {
      a: 1,
      b: 2
    }
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar']
  const options = {
    preset: 'preset',
    reporter: 'reporter'
  }

  cliLib(argv, options).catch((error) => {
    t.equal(
      error,
      'One of the following task names is required:\n* a\n* b\n* default',
      'should throw'
    )

    unmock('../src/lib')

    t.end()
  })
})

test('cli: throw with unknown task name', async (t) => {
  mock('../src/lib', {
    preset: {
      a: 1,
      b: 2
    }
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'c']
  const options = {
    preset: 'preset',
    reporter: 'reporter'
  }

  cliLib(argv, options).catch((error) => {
    t.equal(
      error,
      'One of the following task names is required:\n* a\n* b\n* default',
      'should throw'
    )

    unmock('../src/lib')

    t.end()
  })
})

test('cli: default file', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/lib', {
    [resolve('./tasks')]: {
      task: taskStub
    },
    reporter: reporterStub
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    reporter: 'reporter'
  }

  cliLib(argv, options)
    .then(() => {
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

      unmock('../src/lib')
      t.end()
    })
    .catch(t.end)
})

test('cli: custom file', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/lib', {
    [resolve('./my-tasks')]: {
      task: taskStub
    },
    reporter: reporterStub
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    file: './my-tasks',
    reporter: 'reporter'
  }

  cliLib(argv, options)
    .then(() => {
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

      unmock('../src/lib')
      t.end()
    })
    .catch(t.end)
})

test('cli: preset', async (t) => {
  const taskRunnerSpy = spy()
  const taskStub = stub().callsFake(() => taskRunnerSpy)
  const reporterStub = stub().returns('reporter')
  mock('../src/lib', {
    preset: {
      task: taskStub
    },
    reporter: reporterStub
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    preset: 'preset',
    reporter: 'reporter'
  }

  cliLib(argv, options)
    .then(() => {
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

      unmock('../src/lib')
      t.end()
    })
    .catch(t.end)
})
