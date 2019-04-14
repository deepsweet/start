import plugin from '@start/plugin/src/'
import { Config } from '@jest/types'

export default (userArgv?: Config.Argv) =>
  plugin('jest', () => async () => {
    const { runCLI } = await import('jest-cli')
    const { buildArgv } = await import('jest-cli/build/cli')
    const argv: Config.Argv = {
      ...buildArgv(),
      ...userArgv
    }
    const projects = argv.projects || [argv.rootDir || process.cwd()]
    const result = await runCLI(argv, projects)

    if (
      result.results.numFailedTests > 0 ||
      result.results.numFailedTestSuites > 0 ||
      result.results.numTotalTests === 0
    ) {
      throw null
    }
  })
