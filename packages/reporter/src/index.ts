import path from 'path'
import chalk from 'chalk'
import StackUtils from 'stack-utils'

import { StartMiddleware } from '@start/sequence'

export default (options?: {}) => {
  const reporter: StartMiddleware = (plugin) => async ({ taskName, ...rest }) => {
    const pluginName = plugin.name

    try {
      if (!pluginName) {
        return plugin({ taskName, ...rest })
      }

      console.log(`${chalk.yellow(`${taskName}.${pluginName}`)}: start`)

      const result = await plugin({
        ...rest,
        taskName,
        logMessage: (message) => {
          console.log(`${chalk.blue(`${taskName}.${pluginName}`)}: ${message}`)
        },
        logPath: (message) => {
          const relativePath = path.relative(process.cwd(), message)

          console.log(`${chalk.blue(`${taskName}.${pluginName}`)}: ${relativePath}`)
        },
      })

      console.log(`${chalk.green(`${taskName}.${pluginName}`)}: done`)

      return result
    } catch (error) {
      // hard error
      if (error instanceof Error) {
        const stackUtils = new StackUtils({
          cwd: process.cwd(),
          internals: StackUtils.nodeInternals(),
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

      throw error
    }
  }

  return reporter
}
