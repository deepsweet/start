/* eslint-disable import/unambiguous */
const importCwd = require('import-cwd')

const rootPackage = importCwd('./package.json')

module.exports = (argv: string[]) => {
  const options = {
    file: 'tasks',
    ...rootPackage.start,
  }

  if (Array.isArray(options.require)) {
    options.require.forEach((module) => {
      if (typeof module === 'string') {
        require(module)
      } else if (Array.isArray(module)) {
        require(module[0])(module[1])
      }
    })
  }

  let tasks = importCwd(options.preset ? options.preset : `./${options.file}`)
  const getAvailableTasksRunnersMessage = () => Object.keys(tasks).join('", "')
  const taskName = argv[2]
  const task = tasks[taskName]

  if (typeof taskName === 'undefined' || typeof task === 'undefined') {
    return Promise.reject(
      `One of the following tasks is required: ${getAvailableTasksRunnersMessage()}`
    )
  }

  const taskargv = argv.slice(3)

  return task(...taskargv)({ taskName })
}
