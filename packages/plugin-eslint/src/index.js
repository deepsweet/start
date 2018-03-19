// @flow
import type { StartPlugin } from '@start/task/src'

export default (userOptions?: {}, formatter?: {}) => {
  const eslint: StartPlugin = ({ input, logMessage }) => {
    if (input.length === 0) {
      logMessage('¯\\_(ツ)_/¯')

      return input
    }

    const { CLIEngine } = require('eslint')
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
      return Promise.reject()
    }

    if (report.errorCount === 0 && report.warningCount === 0) {
      logMessage('¯\\_(ツ)_/¯')
    }

    return input
  }

  return eslint
}
