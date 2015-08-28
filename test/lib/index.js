import test from 'tape';

import start from '../../lib/index';

test('export', assert => {
    assert.true(
        typeof start === 'function',
        'must be a function'
    );

    assert.end();
});
