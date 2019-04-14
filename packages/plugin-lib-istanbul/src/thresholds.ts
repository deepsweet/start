import plugin from '@start/plugin/src/'
import { CoverageMapData } from 'istanbul-lib-coverage'

export type TOptions = {
  branches?: number,
  functions?: number,
  lines?: number,
  statements?: number,
}

export default (options: TOptions) =>
  plugin('istanbulThresholds', ({ logMessage }) => async () => {
    const { createCoverageMap } = await import('istanbul-lib-coverage')
    const { createSourceMapStore } = await import('istanbul-lib-source-maps')
    const { summarizers } = await import('istanbul-lib-report')
    const { getObjectKeys } = await import('tsfn')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    hooks.clearAll()

    const coverageMapData = (global as any)[coverageVariable] as CoverageMapData

    if (!coverageMapData) {
      logMessage('no coverage information was collected')

      return
    }

    const coverageMap = createCoverageMap(coverageMapData)
    const sourceMapStore = createSourceMapStore()
    const remappedCoverageMap = sourceMapStore.transformCoverage(coverageMap).map

    const coverageSummary = summarizers
      .flat(remappedCoverageMap)
      .getRoot()
      .getCoverageSummary(true)

    const result = getObjectKeys(options).reduce((errors, key) => {
      const threshold = options[key] as number
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
    }, [] as string[])

    if (result.length > 0) {
      throw result
    }
  })
