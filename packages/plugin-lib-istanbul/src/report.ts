import plugin from '@start/plugin/src/'

export default (formats: string[] = ['lcovonly', 'text-summary']) =>
  plugin('istanbulReport', async ({ files, logMessage }) => {
    const { default: { createCoverageMap } } = await import('istanbul-lib-coverage')
    const { default: { createSourceMapStore } } = await import('istanbul-lib-source-maps')
    const { default: { createReporter } } = await import('istanbul-api')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    hooks.clearAll()

    if (!global[coverageVariable]) {
      logMessage('no coverage information was collected')

      return files
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

    return files
  })
