import plugin from '@start/plugin/src/'


export default (envOrKey : object | string, value? : string) => {
  
  if (typeof envOrKey === 'object') {
    for (let key in envOrKey) {
      process.env[key] = envOrKey[key]
    }
  } else {
    process.env[envOrKey] = value
  }

  return plugin('env', ({ files, logMessage }) => {
    if (typeof envOrKey === 'object') {
      logMessage(`${envOrKey}`)
    } else {
      logMessage(`${envOrKey} = ${value}`)
    }

    return files
  })
}
