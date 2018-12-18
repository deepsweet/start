import plugin, { StartFile, StartFilesProps, StartPlugin, MaybeObject } from '@start/plugin/src/'

export default <R extends MaybeObject> (target: StartPlugin<StartFilesProps, R>) => (...files: string[]) =>
  plugin('inputFiles', (utils) => async () => {
    const path = await import('path')

    const targetRunner = await target

    return targetRunner(utils)({
      files: files.map((file): StartFile => ({
        path: path.resolve(file)
      }))
    })
  })
