import plugin from '@start/plugin/src/'

export default (outDirRelative: string) =>
  plugin('esm-loader', async ({ logFile }) => {
    const path = await import('path')
    const { default: copie } = await import('copie')

    const loaderFilePath = require.resolve('./esm-loader.js')
    const outFile = path.resolve(outDirRelative, 'esm-loader.js')

    await copie(loaderFilePath, outFile)

    logFile(outFile)
  })
