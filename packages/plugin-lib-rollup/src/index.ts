import plugin from '@start/plugin/src/'
import { RollupFileOptions } from 'rollup'

export default (config: RollupFileOptions) =>
  plugin('rollup', async () => {
    const { rollup } = await import('rollup')

    const bundle = await rollup(config)

    await bundle.write(config.output)
  })
