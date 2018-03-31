import { StartPlugin } from '@start/sequence'

export default (value: string, message?: string) => {
  const assert: StartPlugin = async ({ input }) => {
    const { default: assertLib } = await import('assert')

    assertLib(value, message)

    return input
  }

  return assert
}
