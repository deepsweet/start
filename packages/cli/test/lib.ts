import { resolve } from 'path'
import test from 'blue-tape'
import { mock, unmock } from 'mocku'
import { createSpy, getSpyCalls } from 'spyfn'

test('cli: export', async (t) => {
  const { default: cliLib } = await import('../src/lib')

  t.equals(
    typeof cliLib,
    'function',
    'must be a function'
  )
})

test('cli: throw without reporter', async (t) => {
  const { default: cliLib } = await import('../src/lib')

  const argv = [] as string[]
  const options = {}

  return cliLib(argv, options).catch((error) => {
    t.equals(
      error,
      '`reporter` option is missing in your `package.json` → `start`',
      'should throw'
    )
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

  return cliLib(argv, options).catch((error) => {
    t.equals(
      error,
      'One of the following task names is required:\n* a\n* b',
      'should throw'
    )

    unmock('../src/lib')
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

  return cliLib(argv, options).catch((error) => {
    t.equals(
      error,
      'One of the following task names is required:\n* a\n* b',
      'should throw'
    )

    unmock('../src/lib')
  })
})

test('cli: default file', async (t) => {
  const taskRunnerSpy = createSpy(() => () => {})
  const taskSpy = createSpy(() => taskRunnerSpy)
  const reporterSpy = createSpy(() => 'reporter')
  mock('../src/lib', {
    [resolve('./tasks')]: {
      task: taskSpy
    },
    reporter: {
      default: reporterSpy
    }
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    reporter: 'reporter'
  }

  await cliLib(argv, options)

  t.deepEquals(
    getSpyCalls(taskSpy),
    [['arg1', 'arg2']],
    'should call task with args'
  )

  t.deepEquals(
    getSpyCalls(taskRunnerSpy),
    [['reporter']],
    'should call taskRunner with props'
  )

  t.deepEquals(
    getSpyCalls(reporterSpy),
    [['task']],
    'should call reporter with task name'
  )

  unmock('../src/lib')
})

test('cli: custom file', async (t) => {
  const taskRunnerSpy = createSpy(() => () => {})
  const taskSpy = createSpy(() => taskRunnerSpy)
  const reporterSpy = createSpy(() => 'reporter')
  mock('../src/lib', {
    [resolve('./my-tasks')]: {
      task: taskSpy
    },
    reporter: {
      default: reporterSpy
    }
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    file: './my-tasks',
    reporter: 'reporter'
  }

  await cliLib(argv, options)

  t.deepEquals(
    getSpyCalls(taskSpy),
    [['arg1', 'arg2']],
    'should call task with args'
  )

  t.deepEquals(
    getSpyCalls(taskRunnerSpy),
    [['reporter']],
    'should call taskRunner with props'
  )

  t.deepEquals(
    getSpyCalls(reporterSpy),
    [['task']],
    'should call reporter with task name'
  )

  unmock('../src/lib')
})

test('cli: preset', async (t) => {
  const taskRunnerSpy = createSpy(() => () => {})
  const taskSpy = createSpy(() => taskRunnerSpy)
  const reporterSpy = createSpy(() => 'reporter')
  mock('../src/lib', {
    preset: {
      task: taskSpy
    },
    reporter: {
      default: reporterSpy
    }
  })

  const { default: cliLib } = await import('../src/lib')

  const argv = ['foo', 'bar', 'task', 'arg1', 'arg2']
  const options = {
    preset: 'preset',
    reporter: 'reporter'
  }

  await cliLib(argv, options)

  t.deepEquals(
    getSpyCalls(taskSpy),
    [['arg1', 'arg2']],
    'should call task with args'
  )

  t.deepEquals(
    getSpyCalls(taskRunnerSpy),
    [['reporter']],
    'should call taskRunner with props'
  )

  t.deepEquals(
    getSpyCalls(reporterSpy),
    [['task']],
    'should call reporter with task name'
  )

  unmock('../src/lib')
})
