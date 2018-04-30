import test from 'tape'

test('cli: export', (t) => {
  const { default: cliLib } = require('../src/lib')
  t.equal(
    typeof cliLib,
    'function',
    'must be a function'
  )

  t.end()
})

test('cli: no reporter', (t) => {
  const { default: cliLib } = require('../src/lib')
  const argv = ['foo', 'bar', 'task', 'arg']
  const options = {
    file: 'test.js'
  }

  cliLib(argv, options).catch((error) => {
    t.ok(
      /.*reporter.+missing.*/.test(error),
      'should throw'
    )

    t.end()
  })
})

// test('cli: preset', (t) => {
//   const { default: cliLib } = require('../src/lib')
//   const argv = ['foo', 'bar', 'task', 'arg']
//   const options = {
//     preset: 'foo',
//     reporter: 'test-reporter'
//   }
//
//   cliLib(argv, options)
//     .then(() => {
//       t.end()
//     })
//     .catch((error) => {
//       console.error(error)
//       t.end()
//     })
// })
