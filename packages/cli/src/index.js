#!/usr/bin/env node

// @flow
/* eslint-disable no-process-exit */
import importCwd from 'import-cwd'

const rootPackage = importCwd('./package.json')

const options = {
  file: 'tasks',
  ...rootPackage.start,
}

if (Array.isArray(options.require)) {
  options.require.forEach(require)
}

let tasks = importCwd(options.preset ? options.preset : `./${options.file}`)

const getAvailableTasksRunnersMessage = () => {
  return `Available task runners: "${Object.keys(tasks).join('", "')}"`
}

const taskName = process.argv[2]

if (typeof taskName === 'undefined') {
  console.log('Task runner name is required')
  console.log(getAvailableTasksRunnersMessage())
  process.exit(0)
}

const taskRunner = tasks[taskName]

if (typeof taskRunner === 'undefined') {
  console.error(`Unable to find task runner "${taskName}"`)
  console.error(getAvailableTasksRunnersMessage())
  process.exit(1)
}

const taskArgs = process.argv.slice(3)

taskRunner(...taskArgs)({ taskName }).catch(() => {
  process.exit(1)
})
