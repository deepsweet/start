import plugin from '@start/plugin/src/'

export default (options?: {}, extensions: string[] = ['.js']) =>
  plugin('istanbulInstrument', async ({ files, logFile, logMessage }) => {
    const { resolve, relative } = await import('path')
    const { default: Module } = await import('module')
    const { default: { fromSource: getSourceMapFromSource } } = await import('convert-source-map')
    const { default: { createInstrumenter } } = await import('istanbul-lib-instrument')
    const { default: { hookRequire } } = await import('istanbul-lib-hook')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    const instrumenter = createInstrumenter({
      ...options,
      coverageVariable
    })

    hooks.clearAll()

    // clear require cache
    files.forEach((file) => {
      // @ts-ignore
      delete Module._cache[resolve(file.path)]
    })

    const hook = hookRequire(
      // hook requires matches files files
      (file) => {
        return files.findIndex(({ path }) => file === resolve(path)) !== -1
      },
      // and instrument that sources
      (source, file) => {
        const sourceMapRaw = getSourceMapFromSource(source)
        let sourceMapObject = null

        if (sourceMapRaw) {
          sourceMapObject = sourceMapRaw.toObject()
        }

        const result = instrumenter.instrumentSync(source, file, sourceMapObject)

        logFile(relative(process.cwd(), file))

        return result
      },
      { extensions }
    )

    hooks.add(hook)

    logMessage('require() has been hooked')

    return files
  })
