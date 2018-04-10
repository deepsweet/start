import EventEmitter from 'events'
import chalk from 'chalk'
import StackUtils from 'stack-utils'

export default (taskName: string) => {
  const emitter = new EventEmitter()

  emitter.on('start', (pluginName) => {
    console.log(`${chalk.yellow(`${taskName}.${pluginName}`)}: start`)
  })

  emitter.on('message', (pluginName, message) => {
    console.log(`${chalk.cyan(`${taskName}.${pluginName}`)}: ${message}`)
  })

  emitter.on('file', (pluginName, file) => {
    console.log(`${chalk.blue(`${taskName}.${pluginName}`)}: ${file}`)
  })

  emitter.on('done', (pluginName) => {
    console.log(`${chalk.green(`${taskName}.${pluginName}`)}: done`)
  })

  emitter.on('error', (pluginName, error) => {
    // hard error
    if (error instanceof Error) {
      const stackUtils = new StackUtils({
        cwd: process.cwd(),
        internals: StackUtils.nodeInternals()
      })
      const stack = stackUtils.clean(error.stack)

      console.error(`${chalk.red(`${taskName}.${pluginName}`)}: ${error.message}`)
      console.error(`\n${chalk.red(stack)}`)
      // array of "soft" errors
    } else if (Array.isArray(error)) {
      error.forEach((message) => {
        console.error(`${chalk.red(`${taskName}.${pluginName}`)}: ${message}`)
      })
      // "soft" error
    } else if (typeof error === 'string') {
      console.error(`${chalk.red(`${taskName}.${pluginName}`)}: ${error}`)
    }

    console.error(`${chalk.red(`${taskName}.${pluginName}`)}: error`)
  })

  return emitter
}
