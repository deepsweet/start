import plugin, { StartPlugin } from '@start/plugin/src/'
import path from 'path'
import chalk from 'chalk'
import StackUtils from 'stack-utils'

export default (target: StartPlugin) =>
  plugin('reporter', async (props) => {
    const id = `${props.taskName}.${plugin.name}`
    const log = (message) => console.log(`${chalk.blue(`${id}`)}: ${message}`)

    console.log(`${chalk.yellow(`${id}`)}: start`)

    try {
      const result = await target.run({ ...props, log })

      console.log(`${chalk.green(`${id}`)}: done`)

      return result
    } catch (error) {
    // hard error
      if (error instanceof Error) {
        const stackUtils = new StackUtils({
          cwd: process.cwd(),
          internals: StackUtils.nodeInternals()
        })
        const stack = stackUtils.clean(error.stack)

        console.error(`${chalk.red(`${id}`)}: ${error.message}`)
        console.error(`\n${chalk.red(stack)}`)
      // array of "soft" errors
      } else if (Array.isArray(error)) {
        error.forEach((message) => {
          console.error(`${chalk.red(`${id}`)}: ${message}`)
        })
      // "soft" error
      } else if (typeof error === 'string') {
        console.error(`${chalk.red(`${id}`)}: ${error}`)
      }

      console.error(`${chalk.red(`${id}`)}: error`)

      throw null
    }
  })
