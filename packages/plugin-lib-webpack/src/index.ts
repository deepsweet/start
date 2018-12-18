import plugin from '@start/plugin/src/'
import { Configuration, Stats } from 'webpack'

type Webpack = (options: Configuration, cb: (err: any, stats: Stats) => void) => void

export default (config: Configuration, userStatsOptions?: {}) =>
  plugin('webpack', () => async () => {
    const { default: makethen } = await import('makethen')
    const { default: webpackLib } = await import('webpack')
    const compiler = makethen(webpackLib as Webpack)

    const statsOptions = {
      colors: true,
      ...userStatsOptions
    }
    const stats = await compiler(config)

    console.log(stats.toString(statsOptions))

    if (stats.hasErrors()) {
      throw null
    }
  })
