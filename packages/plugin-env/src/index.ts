import plugin from '@start/plugin/src/'

export default (vars: NodeJS.ProcessEnv) =>
  plugin('env', ({ logMessage }) => () => {
    Object.keys(vars).forEach((key) => {
      process.env[key] = vars[key]

      logMessage(`${key} = ${vars[key]}`)
    })
  })
