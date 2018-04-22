import plugin from '@start/plugin/src/'

type Options = {
  rootDir?: string,
  [key: string]: {}
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
  plugin('jest', async ({ files }) => {
    const { default: jestCLI } = await import('jest-cli')

    const options = {
      rootDir: process.cwd(),
      ...userOptions,
      ...optionsToStringify.reduce((result, key) => {
        if (userOptions[key]) {
          result[key] = JSON.stringify(userOptions[key])
        }

        return result
      }, {})
    }
    const projects = [options.rootDir]

    return jestCLI.runCLI(options, projects).then(({ results }) => {
      if (
        results.numFailedTests > 0 ||
        results.numFailedTestSuites > 0 ||
        results.numTotalTests === 0
      ) {
        throw null
      }

      return files
    })
  })
