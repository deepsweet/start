#!/usr/bin/env node
// @flow
/* eslint-disable no-process-exit */
import commander from 'commander'
import resolveCwd from 'resolve-cwd'

const collect = (value, result) => result.concat(value)

commander
  .usage('[options] <task runner> [arguments]')
  .option('-f, --file <file>', 'tasks file path', 'start.js')
  .option('-p, --preset <preset>', 'tasks preset')
  .option('-r, --require [module]', 'module to require (repeatable)', collect, [])
  .parse(process.argv)

let modulePath = null

if (commander.preset) {
  modulePath = resolveCwd(commander.preset)

  if (!modulePath) {
    console.error(`Unable to find "${commander.preset}" preset`)
    process.exit(1)
  }
} else {
  modulePath = resolveCwd(`./${commander.file}`)

  if (!modulePath) {
    console.error(`Unable to find "${commander.file}" file`)
    process.exit(1)
  }
}

// commander.require.forEach(require)

const tasks = require(modulePath)

const getAvailableTasksRunnersMessage = () => {
  return `Available task runners: "${Object.keys(tasks).join('", "')}"`
}

if (commander.args.length === 0) {
  console.log('Task is required')
  console.log(getAvailableTasksRunnersMessage())
  process.exit(0)
}

const taskName = commander.args[0]
const taskRunner = tasks[taskName]

if (typeof taskRunner === 'undefined') {
  console.error(`Unable to find task runner "${taskName}"`)
  console.error(getAvailableTasksRunnersMessage())
  process.exit(1)
}

const taskArgs = commander.args.slice(1)

taskRunner(...taskArgs)({ taskName }).catch(() => {
  process.exit(1)
})
