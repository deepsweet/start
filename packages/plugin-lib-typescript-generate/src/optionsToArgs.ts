// TODO: extract as something universal?
const optionsToArgs = (options: { [key: string]: any }) =>
  Object.keys(options).reduce((result, key) => {
    const value = options[key]

    if (typeof value === 'boolean') {
      return result.concat(`--${key}`)
    }

    if (typeof value === 'string') {
      return result.concat(`--${key}`, `${value}`)
    }

    if (Array.isArray(value)) {
      return result.concat(`--${key}`, `${value.join(',')}`)
    }

    return result
  }, [])

export default optionsToArgs
