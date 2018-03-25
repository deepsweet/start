// @flow
import type { StartPlugin } from '@start/sequence/src/'

export default (key: string, value: string) => {
  process.env[key] = value

  const env: StartPlugin = ({ input, logMessage }) => {
    if (typeof logMessage === 'function') {
      logMessage(`${key} = ${value}`)
    }

    return input
  }

  return env
}
