import plugin from '@start/plugin/src/'

type Options = {
  branches?: number,
  functions?: number,
  lines?: number,
  statements?: number
}

export default (options: Options) =>
  plugin('istanbulThresholds', async ({ files, logMessage }) => {
    const { createCoverageMap } = await import('istanbul-lib-coverage')
    const { createSourceMapStore } = await import('istanbul-lib-source-maps')
    const { summarizers } = await import('istanbul-lib-report')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    hooks.clearAll()

    if (!global[coverageVariable]) {
      logMessage('no coverage information was collected')

      return { files }
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

    return { files }
  })
