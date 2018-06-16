import plugin from '@start/plugin/src/'

export default (formats: string[] = ['lcovonly', 'text-summary']) =>
  plugin('istanbulReport', async ({ logMessage }) => {
    const { createCoverageMap } = await import('istanbul-lib-coverage')
    const { createSourceMapStore } = await import('istanbul-lib-source-maps')
    const { createReporter } = await import('istanbul-api')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    hooks.clearAll()

    if (!global[coverageVariable]) {
      logMessage('no coverage information was collected')

      return
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
  })
