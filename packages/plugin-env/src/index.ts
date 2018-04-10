import plugin from '@start/plugin/src/'

export default (key: string, value: string) => {
  process.env[key] = value

  return plugin('env', ({ files, logMessage }) => {
    logMessage(`${key} = ${value}`)

    return files
  })
}
