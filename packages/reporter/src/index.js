// @flow
import path from 'path'
import EventEmitter from 'events'
import chalk from 'chalk'
import StackUtils from 'stack-utils'

const Reporter = (options?: {}) => {
  const reporter = new EventEmitter()

  reporter.on('task:start', ({ taskName }) => {
    console.log(`${chalk.yellow(`${taskName}`)}: start`)
  })

  reporter.on('plugin:start', ({ taskName, pluginName }) => {
    console.log(`${chalk.yellow(`${taskName}.${pluginName}`)}: start`)
  })

  reporter.on('plugin:log:message', ({ taskName, pluginName, message }) => {
    console.log(`${chalk.blue(`${taskName}.${pluginName}`)}: ${message}`)
  })

  reporter.on('plugin:log:path', ({ taskName, pluginName, message }) => {
    const relativePath = path.relative(process.cwd(), message)

    console.log(`${chalk.blue(`${taskName}.${pluginName}`)}: ${relativePath}`)
  })

  reporter.on('plugin:done', ({ taskName, pluginName }) => {
    console.log(`${chalk.green(`${taskName}.${pluginName}`)}: done`)
  })

  reporter.on('plugin:error', ({ taskName, pluginName, error }) => {
    // hard error
    if (error instanceof Error) {
      const stackUtils = new StackUtils({
        cwd: process.cwd(),
        internals: StackUtils.nodeInternals(),
      })
      const stack = stackUtils.clean(error.stack)

      console.log(`${chalk.red(`${taskName}.${pluginName}`)}: ${error.message}`)
      console.error(`\n${chalk.red(stack)}`)
      // soft error(s)
    } else if (Array.isArray(error)) {
      error.forEach((message) => {
        console.log(`${chalk.red(`${taskName}.${pluginName}`)}: ${message}`)
      })
    } else if (typeof error === 'string') {
      console.log(`${chalk.red(`${taskName}.${pluginName}`)}: ${error}`)
    }

    console.log(`${chalk.red(`${taskName}.${pluginName}`)}: error`)
  })

  reporter.on('task:done', ({ taskName }) => {
    console.log(`${chalk.green(`${taskName}`)}: done`)
  })

  reporter.on('task:error', ({ taskName }) => {
    console.log(`${chalk.red(`${taskName}`)}: error`)
  })

  return reporter
}

export default Reporter
