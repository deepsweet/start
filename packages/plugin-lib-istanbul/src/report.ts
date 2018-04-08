import plugin from '@start/plugin'

export default (formats: string[] = ['lcovonly', 'text-summary']) =>
  plugin('istanbulReport', async ({ files, log }) => {
    const { default: { createCoverageMap } } = await import('istanbul-lib-coverage')
    const { default: { createSourceMapStore } } = await import('istanbul-lib-source-maps')
    const { default: { createReporter } } = await import('istanbul-api')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    hooks.clearAll()

    if (!global[coverageVariable]) {
      log('no coverage information was collected')

      return files
    }

    const coverageMap = createCoverageMap(global[coverageVariable])
    const sourceMapStore = createSourceMapStore()
    const remappedCoverageMap = sourceMapStore.transformCoverage(coverageMap).map
    const reporter = createReporter()

    log(formats.join(', '))

    formats.forEach((format) => {
      reporter.add(format)
      reporter.write(remappedCoverageMap)
    })

    return files
  })
