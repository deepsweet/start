import plugin from '@start/plugin/src/'
import { CLIEngine } from 'eslint'

export default (userOptions?: CLIEngine.Options, format?: string) =>
  plugin('eslint', async ({ files, logMessage, logFile }) => {
    const { default: { CLIEngine } } = await import('eslint')
    const options: CLIEngine.Options = {
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint',
      ...userOptions
    }

    const cli = new CLIEngine(options)
    const filesToCheck = files.filter((file) => !cli.isPathIgnored(file.path))

    const report: CLIEngine.LintReport = filesToCheck.reduce((acc, file) => {
      const [ result ] = cli.executeOnText(file.data, file.path).results

      acc.results.push(result)
      acc.errorCount += result.errorCount
      acc.warningCount += result.warningCount
      acc.fixableErrorCount += result.fixableErrorCount
      acc.fixableWarningCount += result.fixableWarningCount

      return acc
    }, {
      results: [],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    })

    const formatter = cli.getFormatter(format)

    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(formatter(report.results))
    }

    if (report.errorCount > 0) {
      throw null
    }

    if (options.fix && report.results.length > 0) {
      return report.results.map((result) => {
        logFile(result.filePath)

        return ({
          path: result.filePath,
          data: result.output,
          map: null
        })
      })
    }

    if (report.errorCount === 0 && report.warningCount === 0) {
      logMessage('¯\\_(ツ)_/¯')
    }

    return files
  })
