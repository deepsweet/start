#!/usr/bin/env node
import path from 'path';
import requireCwd from 'req-cwd';

if (process.argv.length < 4) {
    throw 'Usage: start <tasks file or moduleID to require> <task name to run>';
}

const tasksPath = process.argv[2];
// `start my-start-pack` or `start ./tasks`
let tasks = requireCwd.silent(tasksPath);

if (tasks === null) {
    try {
        // `start tasks`
        tasks = require(path.resolve(tasksPath));
    } catch (e) {
        throw `Unable to resolve "${tasksPath}"`;
    }
}

const taskName = process.argv[3];

if (typeof tasks[taskName] !== 'function') {
    throw `Unable to find task "${taskName}"`;
}

tasks[taskName]().catch(function() {
    process.exit(1);
});
