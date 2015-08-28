import test from 'tape';
import sinon, { spy } from 'sinon';

import start from '../../lib/index';

test('export', assert => {
    assert.true(
        typeof start === 'function',
        'must be a function'
    );

    assert.end();
});

test('single task + success', assert => {
    const testSpy = spy();
    const testTasks = function testTask() {
        testSpy();

        return Promise.resolve();
    };

    start(testTasks).then(() => {
        assert.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        assert.end();
    });
});

test('single task + error', assert => {
    const testSpy = spy();
    const testTasks = function testTask() {
        testSpy();

        return Promise.reject();
    };

    start(testTasks).catch(() => {
        assert.true(
            testSpy.calledOnce,
            'task must be called once'
        );

        assert.end();
    });
});

test('array of tasks + success', assert => {
    const testSpy1 = spy();
    const testSpy2 = spy();
    const testTasks = [
        function testTask1() {
            return new Promise(resolve => {
                setTimeout(() => {
                    testSpy1();
                    resolve();
                }, 0);
            });
        },
        function testTask2() {
            return new Promise(resolve => {
                setTimeout(() => {
                    testSpy2();
                    resolve('task 2');
                }, 0);
            });
        }
    ];

    start(testTasks).then(() => {
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

test('array of tasks + error', assert => {
    const testSpy1 = spy();
    const testSpy2 = spy();
    const testTasks = [
        function testTask1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    testSpy1();
                    reject('task 1');
                }, 0);
            });
        },
        function testTask2() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    testSpy2();
                    reject();
                }, 0);
            });
        }
    ];

    start(testTasks).catch(() => {
        assert.true(
            testSpy1.calledOnce,
            'task 1 must be called once'
        );

        assert.true(
            testSpy2.notCalled,
            'task 2 must be called once'
        );

        assert.true(
            testSpy1.calledBefore(testSpy2),
            'tasks must be called in sequence'
        );

        assert.end();
    });
});
