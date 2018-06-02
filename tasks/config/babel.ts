const babelConfigCommon = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6
        },
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', {
      polyfill: false
    }],
    ['module-resolver', {
      'alias': {
        '@start/plugin/src/': '@start/plugin',
        '@start/cli-lib/src/': '@start/cli-lib'
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
