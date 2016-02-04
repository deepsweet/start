#!/usr/bin/env node
import reqCwd from 'req-cwd';

if (process.argv.length < 4) {
    throw 'Usage: start <tasks file or moduleID to require> <task name to run>';
}

const tasks = reqCwd.silent(process.argv[2]);

if (tasks === null) {
    throw `Unable to require tasks from "${process.argv[2]}"`;
}

const taskName = process.argv[3];

if (typeof tasks[taskName] !== 'function') {
    throw `Unable to find task "${taskName}"`;
}

tasks[taskName]().catch(function() {
    process.exit(1);
});
