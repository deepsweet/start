#!/usr/bin/env node
/* eslint-disable no-process-exit */
/* eslint-disable no-global-assign */
/* eslint-disable import/unambiguous */

require = require('esm')(module)

const cli = require('@start/cli-lib')

cli(process.argv).catch((error) => {
  if (error !== null) {
    console.error(error)
  }

  process.exit(1)
})
