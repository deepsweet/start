// @flow
import type { StartPlugin } from '@start/task/src/'

export default (key: string, value: string) => {
  process.env[key] = value

  const env: StartPlugin = ({ input, logMessage }) => {
    logMessage(`${key} = ${value}`)

    return input
  }

  return env
}
