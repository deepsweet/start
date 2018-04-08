/* eslint-disable no-process-exit */
/* eslint-disable import/unambiguous */
import cliLib from '@start/cli-lib'

cliLib(process.argv).catch((error) => {
  if (error !== null) {
    console.error(error)
  }

  process.exit(1)
})
