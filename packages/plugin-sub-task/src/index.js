// @flow
import type { StartTaskRunner, StartPlugin } from '@start/task/src/'

export default (taskRunner: StartTaskRunner) => (...args: *[]) => {
  const subTask: StartPlugin = ({ input, taskName }) =>
    taskRunner(...args)({ input, taskName: `${taskName}.${taskRunner.name}` })

  return subTask
}
