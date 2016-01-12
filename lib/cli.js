#!/usr/bin/env node
import path from 'path';

import start from './';

if (process.argv.length < 4) {
    throw new Error('Usage: start <tasks file> <task name>');
}

const tasksPath = path.resolve(process.argv[2]);
const tasks = require(tasksPath);
const taskName = process.argv[3];

if (!(taskName in tasks)) {
    throw new Error(`Can't find task "${taskName}"`);
}

start(tasks[taskName]).catch(function() {
    process.exit(1);
});
