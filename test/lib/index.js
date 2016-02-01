import test from 'tape';
import { spy } from 'sinon';

import start from '../../lib/index';

test('export', function(assert) {
    assert.equal(
        typeof start,
        'function',
        'must be a function'
    );

    assert.end();
});

test('single task + resolve', function(assert) {
    const testSpy = spy();

    start()(
        function() {
            return function testTask() {
                return new Promise(function(resolve) {
                    testSpy();
                    resolve();
                });
            };
        }
    ).then(function() {
        assert.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        assert.end();
    });
});

test('single task + reject', function(assert) {
    const testSpy = spy();

    start()(
        function() {
            return function testTask() {
                return new Promise(function(resolve, reject) {
                    testSpy();
                    reject();
                });
            };
        }
    ).catch(function() {
        assert.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        assert.end();
    });
});

test('sequence of tasks + resolve', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start()(
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
        assert.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        assert.true(
            testSpy2.calledOnce,
            'task 2 must be called once'
        );

        assert.true(
            testSpy1.calledBefore(testSpy2),
            'tasks must be called in sequence'
        );

        assert.end();
    });
});

test('sequence of tasks + reject', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start()(
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
        assert.true(
            testSpy1.calledOnce,
            'task must be called once'
        );

        assert.equal(
            testSpy2.callCount,
            0,
            'task 2 must not been called'
        );

        assert.end();
    });
});

test('sequence of tasks + hard error', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start()(
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
        assert.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        assert.equal(
            testSpy2.callCount,
            0,
            'task 2 must not been called'
        );

        assert.end();
    });
});

test('nested', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    function sub() {
        return start()(
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

    start()(
        sub(),
        function() {
            return function testTask2() {
                return new Promise(function(resolve) {
                    testSpy2();
                    resolve();
                });
            };
        }
    ).then(function() {
        assert.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        assert.true(
            testSpy2.calledOnce,
            'task 2 must be called once'
        );

        assert.true(
            testSpy1.calledBefore(testSpy2),
            'tasks must be called in sequence'
        );

        assert.end();
    });
});

test('logger + single task + resolve', function(assert) {
    const loggerSpy = spy();

    start(loggerSpy)(
        function() {
            return function testTask() {
                return new Promise(function(resolve) {
                    resolve('resolve');
                });
            };
        }
    ).then(function() {
        assert.equal(
            loggerSpy.callCount,
            2,
            'logger must be called 2 times'
        );

        assert.true(
            loggerSpy.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        assert.true(
            loggerSpy.getCall(1).calledWith('testTask', 'resolve'),
            '2nd: resolve'
        );

        assert.end();
    });
});

test('logger + single task + reject', function(assert) {
    const loggerSpy = spy();

    start(loggerSpy)(
        function() {
            return function testTask() {
                return new Promise(function(resolve, reject) {
                    reject('error');
                });
            };
        }
    ).catch(function() {
        assert.equal(
            loggerSpy.callCount,
            2,
            'logger must be called 2 times'
        );

        assert.true(
            loggerSpy.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        assert.true(
            loggerSpy.getCall(1).calledWith('testTask', 'reject', 'error'),
            '2nd: reject'
        );

        assert.end();
    });
});

test('logger + single task + log', function(assert) {
    const loggerSpy = spy();

    start(loggerSpy)(
        function() {
            return function testTask(log) {
                return new Promise(function(resolve, reject) {
                    log('test');

                    resolve();
                });
            };
        }
    ).then(function() {
        assert.equal(
            loggerSpy.callCount,
            3,
            'logger must be called 3 times'
        );

        assert.true(
            loggerSpy.getCall(0).calledWith('testTask', 'start'),
            '1st: start'
        );

        assert.true(
            loggerSpy.getCall(1).calledWith('testTask', 'info', 'test'),
            '2nd: info'
        );

        assert.true(
            loggerSpy.getCall(2).calledWith('testTask', 'resolve'),
            '3rd: resolve'
        );

        assert.end();
    });
});
