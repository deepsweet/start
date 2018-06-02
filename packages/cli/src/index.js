#!/usr/bin/env node
/* eslint-disable import/unambiguous */
/* eslint-disable no-process-exit */
/* eslint-disable no-global-assign */
const { resolve } = require('path')
const { start: options } = require(resolve('./package.json'))

const ESM_SYMBOL = Symbol.for('esm\u200D:package')

if (Array.isArray(options.require)) {
  options.require.forEach((pkg) => {
    if (typeof pkg === 'string') {
      const required = require(pkg)

      if (required[ESM_SYMBOL]) {
        require = required(module)
      }
    } else if (Array.isArray(pkg)) {
      const required = require(pkg[0])

      if (required[ESM_SYMBOL]) {
        require = required(module, pkg[1])
      } else {
        required(pkg[1])
      }
    }
  })
}

const { default: cliLib } = require('@start/cli-lib/src/')

cliLib({
  file: options.file,
  preset: options.preset,
  reporter: options.reporter,
  taskName: process.argv[2],
  taskArgs: process.argv.slice(3)
}).catch((error) => {
  if (error !== null) {
    console.log(error)
  }

  process.exit(1)
})
