import { StartPlugin } from '@start/plugin-sequence'

export default (...files: string[]): StartPlugin => () =>
  files.map((file) => ({
    path: file,
    data: null,
    map: null,
  }))
