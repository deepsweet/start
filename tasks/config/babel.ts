const babelConfigCommon = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.6.0'
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: false
      }
    ],
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-dynamic-import-node',
    [
      'module-resolver', {
        'alias': {
          '@start/plugin/src/': '@start/plugin'
        }
      }
    ]
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
