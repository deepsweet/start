import plugin, { StartPlugin } from '@start/plugin/src/'

export default (target: StartPlugin) => (...files: string[]) =>
  plugin('inputFiles', async ({ reporter }) => {
    const path = await import('path')

    const targetRunner = await target

    return targetRunner({
      reporter,
      files: files.map((file) => ({
        path: path.resolve(file),
        data: null,
        map: null
      }))
    })
  })
