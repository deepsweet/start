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
        function testTask(resolve) {
            testSpy();
            resolve();
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
        function testTask(resolve, reject) {
            testSpy();
            reject();
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
        function testTask1(resolve) {
            setTimeout(function() {
                testSpy1();
                resolve();
            }, 0);
        },
        function testTask2(resolve, reject) {
            setTimeout(function() {
                testSpy2();
                resolve();
            }, 0);
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

test('array of tasks + reject', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start()(
        function testTask1(resolve, reject) {
            testSpy1();
            reject();
        },
        function testTask2(resolve, reject) {
            testSpy2();
            reject();
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

test('array of tasks + hard error', function(assert) {
    const testSpy1 = spy();
    const testSpy2 = spy();

    start()(
        function testTask1() {
            testSpy1();
            throw new Error('oops');
        },
        function testTask2(resolve, reject) {
            testSpy2();
            reject();
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

test('logger + single task + resolve', function(assert) {
    const loggerSpy = spy();

    start(loggerSpy)(
        function testTask(resolve) {
            resolve('resolve');
        }
    ).then(function() {
        assert.equal(
            loggerSpy.callCount,
            4,
            'logger must be called 4 times'
        );

        assert.true(
            loggerSpy.getCall(0).calledWithMatch(
                { type: 'global-start' }
            ),
            '1st call must be with type = global-start'
        );

        assert.true(
            loggerSpy.getCall(1).calledWithMatch(
                { name: 'testTask', messages: undefined, type: 'task-start' }
            ),
            '2nd call must be with type = task-start'
        );

        assert.true(
            loggerSpy.getCall(2).calledWithMatch(
                { name: 'testTask', messages: 'resolve', type: 'task-resolve' }
            ),
            '3rd call must be with type = task-resolve'
        );

        assert.true(
            loggerSpy.getCall(3).calledWithMatch(
                { type: 'global-resolve' }
            ),
            '4th call must be with type = global-resolve'
        );

        assert.end();
    });
});

test('logger + single task + reject', function(assert) {
    const loggerSpy = spy();

    start(loggerSpy)(
        function testTask(resolve, reject) {
            reject('reject');
        }
    ).catch(function() {
        assert.equal(
            loggerSpy.callCount,
            4,
            'logger must be called 4 times'
        );

        assert.true(
            loggerSpy.getCall(0).calledWithMatch(
                { type: 'global-start' }
            ),
            '1st call must be with type = global-start'
        );

        assert.true(
            loggerSpy.getCall(1).calledWithMatch(
                { name: 'testTask', messages: undefined, type: 'task-start' }
            ),
            '2nd call must be with type = task-start'
        );

        assert.true(
            loggerSpy.getCall(2).calledWithMatch(
                { name: 'testTask', messages: 'reject', type: 'task-reject' }
            ),
            '3rd call must be with type = task-reject'
        );

        assert.true(
            loggerSpy.getCall(3).calledWithMatch(
                { type: 'global-reject' }
            ),
            '4th call must be with type = global-reject'
        );

        assert.end();
    });
});
