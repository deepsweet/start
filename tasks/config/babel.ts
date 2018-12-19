const babelConfigCommon = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.6.0'
        },
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', {
      'alias': {
        '@start/plugin/src/': '@start/plugin'
      }
    }]
  ]
}

export const babelConfigBuild = {
  ...babelConfigCommon,
  presets: [
    ...babelConfigCommon.presets,
    '@babel/preset-typescript'
  ]
}

export const babelConfigDts = {
  ...babelConfigCommon,
  plugins: [
    ...babelConfigCommon.plugins,
    '@babel/plugin-syntax-typescript'
  ]
}
