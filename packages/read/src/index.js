// @flow
import type { StartPlugin } from '@start/task/src/'

const read: StartPlugin = ({ input, logPath }) => {
  const makethen = require('makethen')
  const gracefulFs = require('graceful-fs')

  const readFile = makethen(gracefulFs.readFile)

  return Promise.all(
    input.map((file) =>
      readFile(file.path, 'utf8').then((data) => ({
        ...file,
        data,
      }))
    )
  )
}

export default read
