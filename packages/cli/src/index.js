#!/usr/bin/env node
const { resolve } = require('path')
const { start: options } = require(resolve('./package.json'))

// eslint-disable-next-line no-global-assign
require = require('esm')(module, {
  mainFields: ['module', 'main']
})

if (Array.isArray(options.require)) {
  options.require.forEach((pkg) => {
    if (typeof pkg === 'string') {
      require(pkg)
    } else if (Array.isArray(pkg)) {
      require(pkg[0])(pkg[1])
    }
  })
}

const { default: cliLib } = require('./lib')

cliLib(process.argv, options).catch((error) => {
  if (error !== null) {
    console.log(error)
  }

  // eslint-disable-next-line no-process-exit
  process.exit(1)
})
