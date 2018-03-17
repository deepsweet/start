// @flow
import type { StartPlugin, StartInput } from '@start/task/src/'

export default (arg: string | StartInput) => {
  const inputConnector: StartPlugin = () => {
    if (typeof arg === 'string') {
      return [
        {
          path: arg,
          data: null,
          map: null,
        },
      ]
    }

    return arg
  }

  return inputConnector
}
