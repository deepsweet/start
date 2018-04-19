import plugin from '@start/plugin/src/'

type Options = {
  rootDir?: string
  coverageThreshold?: {}
  globals?: {}
  haste?: {}
  moduleNameMapper?: {}
  resolver?: {}
  transform?: {}
}

const optionsToStringify = [
  'coverageThreshold',
  'globals',
  'haste',
  'moduleNameMapper',
  'resolver',
  'transform'
]

export default (userOptions: Options = { rootDir: process.cwd() }) =>
  plugin('jest', async ({ files }) => {
    const { default: jestCLI } = await import('jest-cli')

    const options = {
      ...userOptions,
      rootDir: userOptions.rootDir,
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
