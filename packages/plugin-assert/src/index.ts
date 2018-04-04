import plugin from '@start/plugin/src/'

export default (value: string, message?: string) => plugin({
  name: 'assert',
  run: (emit) => async ({ files }) => {
    const { default: assertLib } = await import('assert')

    assertLib(value, message)

    return files
  }
})
