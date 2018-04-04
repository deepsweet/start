import plugin from '@start/plugin/src/'

export default (glob: string | string[], userOptions?: {}) => plugin({
  name: 'find',
  run: (emit) => async ({ files }) => {
    const { default: globby } = await import('globby')

    const options = {
      absolute: false,
      deep: true,
      onlyFiles: false,
      expandDirectories: false,
      ignore: ['node_modules/**'],
      ...userOptions,
    }

    return globby(glob, options).then((files) =>
      files.map((file) => {
        emit(file)

        return {
          path: file,
          data: null,
          map: null,
        }
      })
    )
  }
})
