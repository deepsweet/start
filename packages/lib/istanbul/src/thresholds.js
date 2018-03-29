// @flow
import { StartPlugin } from '@start/sequence/src/'

export default (options: {} = {}) => {
  const istanbulThresholds: StartPlugin = ({ input, logMessage }) => {
    const { createCoverageMap } = require('istanbul-lib-coverage')
    const { createSourceMapStore } = require('istanbul-lib-source-maps')
    const { summarizers } = require('istanbul-lib-report')
    const hooks = require('./hooks')
    const coverageVariable = require('./variable').default

    hooks.clearAll()

    if (!global[coverageVariable]) {
      logMessage('no coverage information was collected')

      return input
    }

    const coverageMap = createCoverageMap(global[coverageVariable])
    const sourceMapStore = createSourceMapStore()
    const remappedCoverageMap = sourceMapStore.transformCoverage(coverageMap).map

    const coverageSummary = summarizers
      .flat(remappedCoverageMap)
      .getRoot()
      .getCoverageSummary(true)

    const result = Object.keys(options).reduce((errors, key) => {
      const threshold = options[key]
      const summary = coverageSummary[key]

      // check percentage threshold
      if (threshold > 0) {
        if (summary.pct < threshold) {
          return errors.concat(`${key} percentage: ${summary.pct}% < ${threshold}%`)
        }
      }

      // check gap threshold
      if (threshold < 0) {
        if (summary.covered - summary.total < threshold) {
          return errors.concat(`${key} gap: ${summary.covered} - ${summary.total} < ${threshold}`)
        }
      }

      return errors
    }, [])

    if (result.length > 0) {
      throw result
    }

    return input
  }

  return istanbulThresholds
}
