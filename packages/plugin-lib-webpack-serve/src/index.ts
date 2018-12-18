import plugin from '@start/plugin/src/'
import { Options as TOptions } from 'webpack-serve'

export default (options: TOptions, argv: {} = {}) =>
  plugin('webpackServe', () => async () => {
    const { default: serve } = await import('webpack-serve')

    await serve(argv, options)
  })
