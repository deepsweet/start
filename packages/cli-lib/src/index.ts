import { resolve } from 'path'

type Options = {
  file?: string,
  preset?: string,
  reporter?: string,
  taskName?: string,
  taskArgs?: string[]
}

export default async (options: Options) => {
  if (!options.reporter) {
    throw '`reporter` option is missing in your `package.json` → `start`'
  }

  const tasksFile = options.file || './tasks'
  const tasksToRequire = options.preset || resolve(tasksFile)
  const tasks = await import(tasksToRequire)
  const task = tasks[options.taskName]

  if (typeof options.taskName === 'undefined' || typeof task === 'undefined') {
    throw `One of the following task names is required:\n* ${Object.keys(tasks).join('\n* ')}`
  }

  const taskRunner = await task(...options.taskArgs)
  const { default: reporter } = await import(options.reporter)

  return taskRunner({ reporter: reporter(options.taskName) })
}
