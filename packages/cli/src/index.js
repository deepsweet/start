#!/usr/bin/env node
/* eslint-disable import/unambiguous */
/* eslint-disable no-process-exit */
/* eslint-disable no-global-assign */
const path = require('path')
const rootPackage = require(path.resolve('./package.json'))

const options = {
  file: 'tasks',
  require: [],
  ...rootPackage.start
}

options.require.map((pkg) => {
  if (typeof pkg === 'string') {
    const required = require(pkg)

    if (required[Symbol.for('esm\u200D:package')]) {
      require = required(module)
    }
  } else if (Array.isArray(pkg)) {
    require(pkg[0])(pkg[1])
  }
})

const { default: cliLib } = require('./lib')

cliLib(process.argv, options).catch((error) => {
  if (error !== null) {
    console.log(error)
  }

  process.exit(1)
})
