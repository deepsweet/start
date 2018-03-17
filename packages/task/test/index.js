// @flow
import EventEmitter from 'events'
import test from 'tape'
import { spy } from 'sinon'

import type { StartPlugin } from '../src/'

import task from '../src'

const noopReporter = new EventEmitter()

test('export', (t) => {
  t.equal(typeof task, 'function', 'must be a function')
  t.end()
})

test('single task + resolve', (t) => {
  const testSpy = spy()
  const testPlugin: StartPlugin = ({ input }) => {
    return new Promise((resolve) => {
      testSpy()
      resolve(input)
    })
  }

  task(noopReporter)(testPlugin)({ taskName: 'testTask' })
    .then(() => {
      t.true(testSpy.calledOnce, 'task must been called once')
      t.end()
    })
    .catch(t.end)
})

test('single task + reject', (t) => {
  const testSpy = spy()
  const testPlugin: StartPlugin = () => {
    return new Promise((resolve, reject) => {
      testSpy()
      reject()
    })
  }

  task(noopReporter)(testPlugin)({ taskName: 'testTask' }).catch(() => {
    t.true(testSpy.calledOnce, 'task must been called once')
    t.end()
  })
})

test('sequence of tasks + resolve', (t) => {
  const testSpy1 = spy()
  const testSpy2 = spy()
  const testPlugin1: StartPlugin = ({ input }) => {
    return new Promise((resolve) => {
      testSpy1()
      resolve(input)
    })
  }
  const testPlugin2: StartPlugin = ({ input }) => {
    return new Promise((resolve) => {
      testSpy2()
      resolve(input)
    })
  }

  task(noopReporter)(testPlugin1, testPlugin2)({ taskName: 'testTask' })
    .then(() => {
      t.true(testSpy1.calledOnce, 'task 1 must been called once')
      t.true(testSpy2.calledOnce, 'task 2 must been called once')
      t.true(testSpy1.calledBefore(testSpy2), 'tasks must been called in sequence')
      t.end()
    })
    .catch(t.end)
})

test('sequence of tasks + reject', (t) => {
  const testSpy1 = spy()
  const testSpy2 = spy()
  const testPlugin1: StartPlugin = () => {
    return new Promise((resolve, reject) => {
      testSpy1()
      reject()
    })
  }
  const testPlugin2: StartPlugin = () => {
    return new Promise((resolve, reject) => {
      testSpy2()
      reject()
    })
  }

  task(noopReporter)(testPlugin1, testPlugin2)({ taskName: 'testTask' }).catch(() => {
    t.true(testSpy1.calledOnce, 'task must been called once')
    t.equal(testSpy2.callCount, 0, 'task 2 must not been called')
    t.end()
  })
})

test('sequence of tasks + inner hard error', (t) => {
  const testSpy1 = spy()
  const testSpy2 = spy()
  const testPlugin1: StartPlugin = () => {
    return new Promise(() => {
      testSpy1()
      throw new Error('oops')
    })
  }
  const testPlugin2: StartPlugin = () => {
    return new Promise((resolve, reject) => {
      testSpy2()
      reject()
    })
  }

  task(noopReporter)(testPlugin1, testPlugin2)({ taskName: 'testTask' }).catch(() => {
    t.true(testSpy1.calledOnce, 'task 1 must been called once')
    t.equal(testSpy2.callCount, 0, 'task 2 must not been called')
    t.end()
  })
})

test('sequence of tasks + outer hard error', (t) => {
  const testSpy2 = spy()
  const testPlugin1: StartPlugin = () => {
    throw new Error('oops')
  }
  const testPlugin2: StartPlugin = () => {
    return new Promise((resolve, reject) => {
      testSpy2()
      reject()
    })
  }

  task(noopReporter)(testPlugin1, testPlugin2)({ taskName: 'testTask' }).catch(() => {
    t.equal(testSpy2.callCount, 0, 'task 2 must not been called')
    t.end()
  })
})

test('sequence of tasks + input', (t) => {
  const testSpy1 = spy()
  const testSpy2 = spy()
  const testPlugin1: StartPlugin = ({ input }) => {
    return new Promise((resolve) => {
      testSpy1(input)
      resolve(input)
    })
  }
  const testPlugin2: StartPlugin = ({ input }) => {
    return new Promise((resolve) => {
      testSpy2(input)
      resolve(input)
    })
  }
  const input = [{ path: 'test', data: null, map: null }]

  task(noopReporter)(testPlugin1, testPlugin2)({
    taskName: 'testTask',
    input,
  })
    .then(() => {
      t.true(testSpy1.getCall(0).calledWith(input))
      t.true(testSpy2.getCall(0).calledWith(input))
      t.end()
    })
    .catch(t.end)
})

//
//   start(noopReporter)(
//     sub,
//     () => {
//       return function testTask2() {
//         return new Promise((resolve) => {
//           testSpy2();
//           resolve();
//         });
//       };
//     }
//   ).then(() => {
//     t.true(
//       testSpy1.calledOnce,
//       'task 1 must been called once'
//     );
//
//     t.true(
//       testSpy2.calledOnce,
//       'task 2 must been called once'
//     );
//
//     t.true(
//       testSpy1.calledBefore(testSpy2),
//       'tasks must been called in sequence'
//     );
//
//     t.end();
//   });
// });
//
// test('reporter + single task + resolve', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask() {
//         return new Promise((resolve) => {
//           resolve('resolve');
//         });
//       };
//     }
//   ).then(() => {
//     t.equal(
//       spyReporter.callCount,
//       2,
//       'reporter must been called 2 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'resolve'),
//       '2nd: resolve'
//     );
//
//     t.end();
//   });
// });
//
// test('reporter + single task + reject', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask() {
//         return new Promise((resolve, reject) => {
//           reject('error');
//         });
//       };
//     }
//   ).catch(() => {
//     t.equal(
//       spyReporter.callCount,
//       2,
//       'reporter must been called 2 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'reject', 'error'),
//       '2nd: reject'
//     );
//
//     t.end();
//   });
// });
//
// test('reporter + single task + hard error inside the Promise', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask() {
//         return new Promise(() => {
//           throw new Error('oops');
//         });
//       };
//     }
//   ).catch(() => {
//     t.equal(
//       spyReporter.callCount,
//       2,
//       'reporter must been called 2 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
//       '2nd: reject'
//     );
//
//     t.end();
//   });
// });
//
// test('reporter + single task + hard error outside the Promise', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask() {
//         throw new Error('oops');
//       };
//     }
//   ).catch(() => {
//     t.equal(
//       spyReporter.callCount,
//       2,
//       'reporter must been called 2 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
//       '2nd: reject'
//     );
//
//     t.end();
//   });
// });
//
// test('reporter + single task + log', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask(log) {
//         return new Promise((resolve) => {
//           log('test');
//
//           resolve();
//         });
//       };
//     }
//   ).then(() => {
//     t.equal(
//       spyReporter.callCount,
//       3,
//       'reporter must been called 3 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'info', 'test'),
//       '2nd: info'
//     );
//
//     t.true(
//       spyReporter.getCall(2).calledWith('testTask', 'resolve'),
//       '3rd: resolve'
//     );
//
//     t.end();
//   });
// });
//
// test('log + reporter', (t) => {
//   const spyReporter = spy();
//
//   start(spyReporter)(
//     () => {
//       return function testTask(log, reporter) {
//         t.deepEqual(spyReporter, reporter);
//         t.end();
//
//         return Promise.resolve();
//       };
//     }
//   );
// });
//
// test('default reporter', (t) => {
//   const origConsoleLog = console.log;
//   const spyReporter = spy();
//
//   console.log = spyReporter;
//
//   start()(
//     () => {
//       return function testTask() {
//         return new Promise((resolve) => {
//           resolve();
//         });
//       };
//     }
//   ).then(() => {
//     console.log = origConsoleLog;
//
//     t.equal(
//       spyReporter.callCount,
//       2,
//       'reporter must been called 2 times'
//     );
//
//     t.true(
//       spyReporter.getCall(0).calledWith('testTask', 'start'),
//       '1st: start'
//     );
//
//     t.true(
//       spyReporter.getCall(1).calledWith('testTask', 'resolve'),
//       '2nd: resolve'
//     );
//
//     t.end();
//   });
// });
