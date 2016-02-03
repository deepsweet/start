#!/usr/bin/env node
import path from 'path';

if (process.argv.length < 4) {
    throw 'Usage: start <tasks file> <task name>';
}

const tasksPath = path.resolve(process.argv[2]);
const taskName = process.argv[3];
const tasks = require(tasksPath);

if (typeof tasks[taskName] !== 'function') {
    throw `Can't find task "${taskName}"`;
}

tasks[taskName]().catch(function() {
    process.exit(1);
});
