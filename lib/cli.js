#!/usr/bin/env node
import reqCwd from 'req-cwd';

if (process.argv.length < 4) {
    throw 'Usage: start <tasks file/moduleID> <task name>';
}

const tasks = reqCwd.silent(process.argv[2]);

if (tasks === null) {
    throw `Can't resolve tasks in "${process.argv[2]}" file or moduleID`;
}

const taskName = process.argv[3];

if (typeof tasks[taskName] !== 'function') {
    throw `Can't find task "${taskName}"`;
}

tasks[taskName]().catch(function() {
    process.exit(1);
});
