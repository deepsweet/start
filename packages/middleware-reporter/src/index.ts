import plugin, { StartPluginOut } from '@start/plugin/src/'
import path from 'path'
import chalk from 'chalk'
import StackUtils from 'stack-utils'

// import { StartMiddleware } from '@start/plugin-sequence'

export default (plugin: StartPluginOut) => {
  const { on, name } = plugin

  on('start', () => console.log(`${chalk.yellow(`${name}`)}: start`))

  on('message', ({ message }) => console.log(`${chalk.blue(`${name}`)}: ${message}`))

  on('done', () => console.log(`${chalk.green(`${name}`)}: done`))

  on('error', ({ error }) => {
    // hard error
    if (error instanceof Error) {
      const stackUtils = new StackUtils({
        cwd: process.cwd(),
        internals: StackUtils.nodeInternals(),
      })
      const stack = stackUtils.clean(error.stack)

      console.error(`${chalk.red(`${name}`)}: ${error.message}`)
      console.error(`\n${chalk.red(stack)}`)
      // array of "soft" errors
    } else if (Array.isArray(error)) {
      error.forEach((message) => {
        console.error(`${chalk.red(`${name}`)}: ${message}`)
      })
      // "soft" error
    } else if (typeof error === 'string') {
      console.error(`${chalk.red(`${name}`)}: ${error}`)
    }

    console.error(`${chalk.red(`${name}`)}: error`)
  })

  return plugin
}
