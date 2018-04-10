const importCwd = require('import-cwd')

type Options = {
  file?: string,
  preset?: string,
  reporter?: string,
  require?: Array<string | any[]>
}

export default async (argv: string[], options: Options) => {
  let tasks = importCwd(options.preset || `./${options.file}`)
  const taskName = argv[2]
  const task = tasks[taskName]

  if (typeof taskName === 'undefined' || typeof task === 'undefined') {
    throw `One of the following task names is required: "${Object.keys(tasks).join('", "')}"`
  }

  const taskArgs = argv.slice(3)

  if (!options.reporter) {
    throw '`reporter` option is missing in your `package.json` → `start`'
  }

  const { default: reporter } = await import(options.reporter)

  return task(...taskArgs)({ reporter: reporter(taskName) })
}
