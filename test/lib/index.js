import test from 'tape';
import { spy } from 'sinon';

import start from '../../lib/index';

const noopReporter = () => {};

test('export', t => {
    t.equal(
        typeof start,
        'function',
        'must be a function'
    );

    t.end();
});

test('single task + resolve', t => {
    const testSpy = spy();

    start(noopReporter)(
        function() {
            return function testTask() {
                return new Promise(function(resolve) {
                    testSpy();
                    resolve();
                });
            };
        }
    ).then(function() {
        t.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        t.end();
    });
});

test('single task + reject', t => {
    const testSpy = spy();

    start(noopReporter)(
        function() {
            return function testTask() {
                return new Promise(function(resolve, reject) {
                    testSpy();
                    reject();
                });
            };
        }
    ).catch(function() {
        t.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        t.end();
    });
});

test('sequence of tasks + resolve', t => {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start(noopReporter)(
        function() {
            return function testTask1() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        testSpy1();
                        resolve();
                    }, 0);
                });
            };
        },
        function() {
            return function testTask2() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        testSpy2();
                        resolve();
                    }, 0);
                });
            };
        }
    ).then(function() {
        t.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        t.true(
            testSpy2.calledOnce,
            'task 2 must be called once'
        );

        t.true(
            testSpy1.calledBefore(testSpy2),
            'tasks must be called in sequence'
        );

        t.end();
    });
});

test('sequence of tasks + reject', t => {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start(noopReporter)(
        function() {
            return function testTask1() {
                return new Promise(function(resolve, reject) {
                    testSpy1();
                    reject();
                });
            };
        },
        function() {
            return function testTask2() {
                return new Promise(function(resolve, reject) {
                    testSpy2();
                    reject();
                });
            };
        }
    ).catch(function() {
        t.true(
            testSpy1.calledOnce,
            'task must be called once'
        );

        t.equal(
            testSpy2.callCount,
            0,
            'task 2 must not been called'
        );

        t.end();
    });
});

test('sequence of tasks + hard error', t => {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start(noopReporter)(
        function() {
            return function testTask1() {
                return new Promise(function() {
                    testSpy1();
                    throw new Error('oops');
                });
            };
        },
        function() {
            return function testTask2() {
                return new Promise(function(resolve, reject) {
                    testSpy2();
                    reject();
                });
            };
        }
    ).catch(function() {
        t.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        t.equal(
            testSpy2.callCount,
            0,
            'task 2 must not been called'
        );

        t.end();
    });
});

test('nested', t => {
    const testSpy1 = spy();
    const testSpy2 = spy();

    function sub() {
        return start(noopReporter)(
            function() {
                return function testTask1() {
                    return new Promise(function(resolve) {
                        testSpy1();
                        resolve();
                    });
                };
            }
        );
    }

    start(noopReporter)(
        sub,
        function() {
            return function testTask2() {
                return new Promise(function(resolve) {
                    testSpy2();
                    resolve();
                });
            };
        }
    ).then(function() {
        t.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        t.true(
            testSpy2.calledOnce,
            'task 2 must be called once'
        );

        t.true(
            testSpy1.calledBefore(testSpy2),
            'tasks must be called in sequence'
        );

        t.end();
    });
});

test('reporter + single task + resolve', t => {
    const spyReporter = spy();

    start(spyReporter)(
        function() {
            return function testTask() {
                return new Promise(function(resolve) {
                    resolve('resolve');
                });
            };
        }
    ).then(function() {
        t.equal(
            spyReporter.callCount,
            2,
            'reporter must be called 2 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'resolve'),
            '2nd: resolve'
        );

        t.end();
    });
});

test('reporter + single task + reject', t => {
    const spyReporter = spy();

    start(spyReporter)(
        function() {
            return function testTask() {
                return new Promise(function(resolve, reject) {
                    reject('error');
                });
            };
        }
    ).catch(function() {
        t.equal(
            spyReporter.callCount,
            2,
            'reporter must be called 2 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'reject', 'error'),
            '2nd: reject'
        );

        t.end();
    });
});

test('reporter + single task + hard error inside the Promise', t => {
    const spyReporter = spy();

    start(spyReporter)(
        function() {
            return function testTask() {
                return new Promise(function(resolve, reject) {
                    throw new Error('oops');
                });
            };
        }
    ).catch(function() {
        t.equal(
            spyReporter.callCount,
            2,
            'reporter must be called 2 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
            '2nd: reject'
        );

        t.end();
    });
});

test('reporter + single task + hard error outside the Promise', t => {
    const spyReporter = spy();

    start(spyReporter)(
        function() {
            return function testTask() {
                throw new Error('oops');

                return new Promise(function(resolve, reject) {
                    resolve();
                });
            };
        }
    ).catch(function() {
        t.equal(
            spyReporter.callCount,
            2,
            'reporter must be called 2 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
            '2nd: reject'
        );

        t.end();
    });
});

test('reporter + single task + log', t => {
    const spyReporter = spy();

    start(spyReporter)(
        function() {
            return function testTask(log) {
                return new Promise(function(resolve, reject) {
                    log('test');

                    resolve();
                });
            };
        }
    ).then(function() {
        t.equal(
            spyReporter.callCount,
            3,
            'reporter must be called 3 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'info', 'test'),
            '2nd: info'
        );

        t.true(
            spyReporter.getCall(2).calledWith('testTask', 'resolve'),
            '3rd: resolve'
        );

        t.end();
    });
});

test('default reporter', t => {
    const origConsoleLog = console.log;
    const spyReporter = spy();

    console.log = spyReporter;

    start()(
        function() {
            return function testTask(log) {
                return new Promise(function(resolve, reject) {
                    resolve();
                });
            };
        }
    ).then(function() {
        console.log = origConsoleLog;

        t.equal(
            spyReporter.callCount,
            2,
            'reporter must be called 2 times'
        );

        t.true(
            spyReporter.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        t.true(
            spyReporter.getCall(1).calledWith('testTask', 'resolve'),
            '2nd: resolve'
        );

        t.end();
    });
});
