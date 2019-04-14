import plugin, { StartFilesProps } from '@start/plugin/src/'
import { InstrumenterOptions } from 'istanbul-lib-instrument'

export default (options?: Partial<InstrumenterOptions>, extensions?: string[]) =>
  plugin('istanbulInstrument', ({ logMessage }) => async ({ files }: StartFilesProps) => {
    const Module = await import('module')
    const { fromSource: getSourceMapFromSource } = await import('convert-source-map')
    const { createInstrumenter } = await import('istanbul-lib-instrument')
    const { hookRequire } = await import('istanbul-lib-hook')
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
      delete Module._cache[file.path]
    })

    const hook = hookRequire(
      // hook requires matches files files
      (file) => files.findIndex(({ path }) => file === path) !== -1,
      // and instrument that sources
      (source, options) => {
        const sourceMapRaw = getSourceMapFromSource(source)
        let sourceMapObject = null

        if (sourceMapRaw) {
          sourceMapObject = sourceMapRaw.toObject()
        }

        // @ts-ignore
        // TODO: update @types/istanbul-lib-hook
        return instrumenter.instrumentSync(source, options.file, sourceMapObject)
      },
      { extensions }
    )

    hooks.add(hook)

    logMessage('imports has been hooked')
  })
