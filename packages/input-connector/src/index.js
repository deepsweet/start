// @flow
import type { StartPlugin, StartInput } from '@start/task/src/'

export default (arg: string | StartInput) => {
  const inputConnector: StartPlugin = () => {
    if (typeof arg === 'string') {
      return Promise.resolve([
        {
          path: arg,
          data: null,
          map: null,
        },
      ])
    }

    return Promise.resolve(arg)
  }

  return inputConnector
}
