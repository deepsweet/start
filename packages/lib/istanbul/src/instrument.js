// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (options?: {}, extensions: string[] = ['.js']) => {
  const istanbulInstrument: StartPlugin = ({ input, logPath, logMessage }) => {
    const { fromSource: getSourceMapFromSource } = require('convert-source-map')
    const { createInstrumenter } = require('istanbul-lib-instrument')
    const { hookRequire } = require('istanbul-lib-hook')
    const hooks = require('./hooks')
    const coverageVariable = require('./variable').default

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

        logPath && logPath(file)

        return result
      },
      { extensions }
    )

    hooks.add(hook)

    if (typeof logMessage === 'function') {
      logMessage('require() has been hooked')
    }

    return input
  }

  return istanbulInstrument
}
