import { StartPlugin } from '@start/plugin-sequence'

export default (key: string, value: string) => {
  process.env[key] = value

  const env: StartPlugin = ({ input, log }) => {
    log(`${key} = ${value}`)

    return input
  }

  return env
}
