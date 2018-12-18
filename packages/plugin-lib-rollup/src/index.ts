import plugin from '@start/plugin/src/'
import { RollupFileOptions } from 'rollup'

export default (config: RollupFileOptions) =>
  plugin('rollup', () => async () => {
    const { rollup } = await import('rollup')

    const bundle = await rollup(config)

    if (typeof config.output === 'undefined') {
      throw new Error('config output is not defined')
    }

    await bundle.write(config.output)
  })
