import plugin from '@start/plugin/src/'

type Options = {
  rootDir?: string,
  [key: string]: any
}

const optionsToStringify = [
  'coverageThreshold',
  'globals',
  'haste',
  'moduleNameMapper',
  'resolver',
  'transform'
]

export default (userOptions: Options) =>
  plugin('jest', () => async () => {
    // @ts-ignore
    const { runCLI } = await import('jest-cli')

    const options: Options = {
      rootDir: process.cwd(),
      ...userOptions,
      ...optionsToStringify.reduce((result, key) => {
        if (userOptions[key]) {
          result[key] = JSON.stringify(userOptions[key])
        }

        return result
      }, {} as Options)
    }
    const projects = [options.rootDir]
    const results = await runCLI(options, projects)

    if (
      results.numFailedTests > 0 ||
      results.numFailedTestSuites > 0 ||
      results.numTotalTests === 0
    ) {
      throw null
    }
  })
