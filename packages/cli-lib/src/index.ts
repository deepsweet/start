/* eslint-disable import/unambiguous */
import importCwd from 'import-cwd'

const rootPackage = importCwd('./package.json')

const importModules = (modules) => Promise.all(
  modules.map(async (module) => {
    if (typeof module === 'string') {
      return import(module)
    }

    if (Array.isArray(module)) {
      const { default: registerModule } = await import(module[0])

      return registerModule(module[1])
    }
  })
)

export default async (argv: string[]) => {
  const options = {
    file: 'tasks',
    ...rootPackage.start
  }

  if (Array.isArray(options.imports)) {
    await importModules(options.imports)
  }

  let tasks = importCwd(options.preset ? options.preset : `./${options.file}`)
  const taskName = argv[2]
  const task = tasks[taskName]

  if (typeof taskName === 'undefined' || typeof task === 'undefined') {
    return Promise.reject(
      `One of the following tasks is required: ${Object.keys(tasks).join('", "')}`
    )
  }

  const taskArgs = argv.slice(3)

  if (!options.reporter) {
    return Promise.reject('`reporter` option is missing')
  }

  const { default: reporter } = await import(options.reporter)

  return task(...taskArgs)({ reporter: reporter(taskName) })
}
