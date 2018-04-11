import plugin, { StartPlugin } from '@start/plugin/src/'

export default (target: StartPlugin) => (...files: string[]) =>
  plugin('inputFiles', ({ reporter }) => target({
    reporter,
    files: files.map((file) => ({
      path: file,
      data: null,
      map: null
    }))
  }))
