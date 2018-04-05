import plugin from '@start/plugin/src/'

export default (key: string, value: string) => {
  process.env[key] = value

  return plugin('env', ({ files, log }) => {
    log(`${key} = ${value}`)

    return files
  })
}
