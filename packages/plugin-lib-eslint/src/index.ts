import plugin from '@start/plugin/src/'

export default (userOptions?: {}, formatter?: string) =>
  plugin('eslint', async ({ files, log }) => {
    const { default: { CLIEngine } } = await import('eslint')
    const options = {
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint',
      ...userOptions
    }

    const cli = new CLIEngine(options)
    const filesToCheck = files.filter(({ path }) => !cli.isPathIgnored(path)).map(({ path }) => path)
    const report = cli.executeOnFiles(filesToCheck)
    const format = cli.getFormatter(formatter)

    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(format(report.results))
    }

    if (report.errorCount > 0) {
      return Promise.reject(null)
    }

    if (report.errorCount === 0 && report.warningCount === 0) {
      log('¯\\_(ツ)_/¯')
    }

    return files
  })
