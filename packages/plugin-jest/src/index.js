// @flow
import type { StartPlugin } from '@start/sequence/src/'

type Options = {
  rootDir?: string,
  coverageThreshold?: {},
  globals?: {},
  haste?: {},
  moduleNameMapper?: {},
  resolver?: {},
  transform?: {},
}

const optionsToStringify = [
  'coverageThreshold',
  'globals',
  'haste',
  'moduleNameMapper',
  'resolver',
  'transform',
]

export default (userOptions?: Options = { rootDir: process.cwd() }) => {
  const jest: StartPlugin = ({ input }) => {
    const jestCLI = require('jest-cli')

    const options = {
      ...userOptions,
      rootDir: userOptions.rootDir,
      ...optionsToStringify.reduce((result, key) => {
        if (userOptions[key]) {
          result[key] = JSON.stringify(userOptions[key])
        }

        return result
      }, {}),
    }
    const projects = [options.rootDir]

    return jestCLI.runCLI(options, projects).then(({ results }) => {
      if (
        results.numFailedTests > 0 ||
        results.numFailedTestSuites > 0 ||
        results.numTotalTests === 0
      ) {
        return Promise.reject()
      }

      return input
    })
  }

  return jest
}
