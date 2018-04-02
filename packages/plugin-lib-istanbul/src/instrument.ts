import { StartPlugin } from '@start/plugin-sequence'

export default (options?: {}, extensions: string[] = ['.js']) => {
  const istanbulInstrument: StartPlugin = async ({ input, logMessage }) => {
    const { default: { fromSource: getSourceMapFromSource } } = await import('convert-source-map')
    const { default: { createInstrumenter } } = await import('istanbul-lib-instrument')
    const { default: { hookRequire } } = await import('istanbul-lib-hook')
    const hooks = await import('./hooks')
    const { default: coverageVariable } = await import('./variable')

    const instrumenter = createInstrumenter({
      ...options,
      coverageVariable,
    })

    hooks.clearAll()

    // clear require cache
    input.forEach((file) => {
      delete require.cache[file.path]
    })

    const hook = hookRequire(
      // hook requires matches input files
      (file) => {
        return input.findIndex(({ path }) => file === path) !== -1
      },
      // and instrument that sources
      (source, file) => {
        const sourceMapRaw = getSourceMapFromSource(source)
        let sourceMapObject = null

        if (sourceMapRaw) {
          sourceMapObject = sourceMapRaw.toObject()
        }

        const result = instrumenter.instrumentSync(source, file, sourceMapObject)

        logMessage(file)

        return result
      },
      { extensions }
    )

    hooks.add(hook)

    logMessage('require() has been hooked')

    return input
  }

  return istanbulInstrument
}
