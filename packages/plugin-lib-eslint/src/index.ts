import { StartPlugin } from '@start/plugin-sequence'

export default (userOptions?: {}, formatter?: string) => {
  const eslint: StartPlugin = async ({ input, log }) => {
    const { default: { CLIEngine } } = await import('eslint')
    const options = {
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint',
      ...userOptions,
    }

    const cli = new CLIEngine(options)
    const files = input.filter(({ path }) => !cli.isPathIgnored(path)).map(({ path }) => path)
    const report = cli.executeOnFiles(files)
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

    return input
  }

  return eslint
}
