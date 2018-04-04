import plugin from '@start/plugin/src/'

export default (key: string, value: string) => plugin({
  name: 'env',
  run: (emit) => {
    process.env[key] = value

    return ({ files }) => {
      emit(`${key} = ${value}`)

      return files
    }
  }
})
