// @flow
import type { StartPlugin } from '@start/task/src/'

export default (formats: string[] = ['lcovonly', 'text-summary']) => {
  const istanbulReport: StartPlugin = ({ input, logMessage }) => {
    const { createCoverageMap } = require('istanbul-lib-coverage')
    const { createSourceMapStore } = require('istanbul-lib-source-maps')
    const { createReporter } = require('istanbul-api')
    const hooks = require('./hooks')
    const coverageVariable = require('./variable').default

    hooks.clearAll()

    if (!global[coverageVariable]) {
      return Promise.reject('no coverage information was collected')
    }

    const coverageMap = createCoverageMap(global[coverageVariable])
    const sourceMapStore = createSourceMapStore()
    const remappedCoverageMap = sourceMapStore.transformCoverage(coverageMap).map
    const reporter = createReporter()

    logMessage(formats.join(', '))

    formats.forEach((format) => {
      reporter.add(format)
      reporter.write(remappedCoverageMap)
    })

    return Promise.resolve(input)
  }

  return istanbulReport
}
