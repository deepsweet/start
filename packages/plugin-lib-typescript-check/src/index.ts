import plugin from '@start/plugin/src/'

export type Options = {
  [key: string]: boolean | string | string[]
}

export default (userOptions?: Options) =>
  plugin('typescriptCheck', () => async () => {
    const path = await import('path')
    const { default: execa } = await import('execa')

    const tscBinPath = path.resolve('node_modules/.bin/tsc')
    const spawnOptions = {
      stripEof: false,
      env: {
        FORCE_COLOR: '1'
      }
    }
    const options: Options = {
      allowSyntheticDefaultImports: true,
      lib: 'esnext',
      moduleResolution: 'node',
      pretty: true,
      ...userOptions,
      noEmit: true
    }
    const tscArgs = Object.keys(options).reduce((result, key) => {
      const value = options[key]

      if (typeof value === 'boolean') {
        return result.concat(`--${key}`)
      }

      if (typeof value === 'string') {
        return result.concat(`--${key}`, `${value}`)
      }

      if (Array.isArray(value)) {
        return result.concat(`--${key}`, `${value.join(',')}`)
      }

      return result
    }, [] as string[])

    await execa(tscBinPath, tscArgs, spawnOptions)
  })
