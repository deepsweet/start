import plugin from '@start/plugin/src/'

export default (vars: { [key: string]: any }) => {
  Object.keys(vars).forEach((key) => {
    process.env[key] = vars[key]
  })

  return plugin('env', ({ files, logMessage }) => {
    Object.keys(vars).forEach((key) => {
      logMessage(`${key} = ${vars[key]}`)
    })

    return files
  })
}
