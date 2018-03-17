// @flow
import type { StartTask, StartPlugin } from '@start/task/src/'

type StartTaskRunner = () => StartTask

export default (taskRunner: StartTaskRunner) => (...args: *[]) => {
  const subTask: StartPlugin = ({ input, taskName }) =>
    taskRunner(...args)({ input, taskName: `${taskName}.${taskRunner.name}` })

  return subTask
}
