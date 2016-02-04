import Start from 'start';
import logger from 'start-simple-logger';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import babel from 'start-babel';
import write from 'start-write';
import eslint from 'start-eslint';
import tape from 'start-tape';
import * as coverage from 'start-coverage';
import codecov from 'start-codecov';

import istanbul from 'babel-istanbul';
import tapSpec from 'tap-spec';

const start = Start(logger());

export function build() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        babel(),
        write('build/')
    );
}

export function dev() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        watch(file => start(
            files(file),
            babel(),
            write('build/')
        ))
    );
}

export function lint() {
    return start(
        files('**/*.js'),
        eslint()
    );
}

export function test() {
    return start(
        files('test/**/*.js'),
        tape(tapSpec)
    );
}

export function tdd() {
    return start(
        files([ 'lib/**/*.js', 'test/**/*.js' ]),
        watch(test)
    );
}

export function cover() {
    return start(
        files('coverage/'),
        clean(),
        files('lib/**/*.js'),
        coverage.instrument(istanbul),
        test,
        coverage.report([ 'lcovonly', 'html', 'text-summary' ])
    );
}

export function travis() {
    return start(
        lint,
        cover,
        codecov()
    );
}

export function prepush() {
    return start(
        lint,
        cover
    );
}
