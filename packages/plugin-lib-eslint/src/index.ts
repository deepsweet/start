import plugin, { StartDataFilesProps, StartDataFile } from '@start/plugin/src/'
import { CLIEngine } from 'eslint'

export default (userOptions?: CLIEngine.Options, formatter = '') =>
  plugin('eslint', ({ logMessage, logPath }) => async ({ files }: StartDataFilesProps) => {
    const { CLIEngine } = await import('eslint')
    const options: CLIEngine.Options = {
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint',
      ...userOptions
    }

    const cli = new CLIEngine(options)
    const filesToCheck = files.filter((file) => !cli.isPathIgnored(file.path))

    const report: CLIEngine.LintReport = filesToCheck.reduce((acc, file) => {
      const [result] = cli.executeOnText(file.data, file.path).results

      acc.results.push(result)
      acc.errorCount += result.errorCount
      acc.warningCount += result.warningCount
      acc.fixableErrorCount += result.fixableErrorCount
      acc.fixableWarningCount += result.fixableWarningCount

      return acc
    }, {
      results: [] as CLIEngine.LintResult[],
      errorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    })

    const format = cli.getFormatter(formatter)

    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(format(report.results))
    }

    if (report.errorCount > 0) {
      throw null
    }

    if (options.fix && report.results.length > 0) {
      const fixedFiles = report.results
        .filter(({ output }) => typeof output === 'string')
        .map((result): StartDataFile => {
          logPath(result.filePath)

          return ({
            path: result.filePath,
            data: result.output!
          })
        })

      if (fixedFiles.length === 0) {
        logMessage('¯\\_(ツ)_/¯')

        return
      }

      return {
        files: fixedFiles
      }
    }

    if (report.errorCount === 0 && report.warningCount === 0) {
      logMessage('¯\\_(ツ)_/¯')
    }
  })
