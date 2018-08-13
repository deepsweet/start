import plugin from '@start/plugin/src/'

export default (outDir: string, filename: string = 'esm-loader.js') =>
  plugin('esm-loader', async ({ logFile }) => {
    const path = await import('path')
    const { default: copie } = await import('copie')

    const loaderFilePath = require.resolve('./esm-loader.js')
    const outFile = path.resolve(outDir, filename)

    await copie(loaderFilePath, outFile)

    logFile(outFile)
  })
