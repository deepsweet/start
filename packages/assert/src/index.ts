import { StartPlugin } from '@start/sequence/src/'

export default (value: string, message?: string) => {
  const assert: StartPlugin = async ({ input }) => {
    const { default: assertLib } = await import('assert')

    assertLib(value, message)

    return input
  }

  return assert
}
