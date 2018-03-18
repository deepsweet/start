// @flow
import assert from 'assert'
import Task from '@start/task/src/'
import Reporter from '@start/reporter/src/'
import subTask from '@start/sub-task/src/'
import env from '@start/env/src'
import find from '@start/find/src/'
import findGitStaged from '@start/find-git-staged/src/'
import clean from '@start/clean/src/'
import read from '@start/read/src'
import babel from '@start/babel/src'
import write from '@start/write/src'
import overwrite from '@start/overwrite/src'
import watch from '@start/watch/src'
import eslint from '@start/eslint/src/'
import prettierEslint from '@start/prettier-eslint/src/'
import { istanbulInstrument, istanbulReport /*, istanbulThresholds */ } from '@start/istanbul/src/'
import tape from '@start/tape/src'
import npmVersion from '@start/npm-version/src/'
import npmPublish from '@start/npm-publish/src/'
import inputFileConnector from '@start/input-file-connector/src/'
import tapDiff from 'tap-diff'

const reporter = Reporter()
const task = Task(reporter)

const babelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6,
        },
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
}

export const build = (packageName: string) => {
  assert(packageName, 'Package name is required')

  return task(
    env('NODE_ENV', 'production'),
    find(`packages/${packageName}/build/`),
    clean,
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfig),
    write(`packages/${packageName}/build/`)
  )
}

export const dev = (packageName: string) => {
  assert(packageName, 'Package name is required')

  return task(
    find(`packages/${packageName}/build/`),
    clean,
    watch(`packages/${packageName}/src/**/*.js`)(
      task(read, babel(babelConfig), write(`packages/${packageName}/build/`))
    )
  )
}

export const lint = () =>
  task(findGitStaged(['packages/*/@(src|test)/**/*.js', 'tasks/**/*.js']), eslint())

export const lintFiles = (...files: string[]) => task(inputFileConnector(files), eslint())

export const lintAll = () =>
  task(find(['packages/*/@(src|test)/**/*.js', 'tasks/**/*.js']), eslint())

export const fix = () => task(find('packages/*/src/**/*.js'), read, prettierEslint(), overwrite)

export const test = () =>
  task(
    find('packages/*/src/**/*.js'),
    istanbulInstrument({ esModules: true }),
    find('packages/*/test/**/*.js'),
    tape(tapDiff),
    istanbulReport(['lcovonly', 'html', 'text-summary'])
    // istanbulThresholds({ functions: 70 })
  )

export const ci = () => task(subTask(lintAll)(), subTask(test)())

export const publish = (packageName: string, version: string, otp: string) => {
  assert(packageName, 'Package name is required')
  assert(version, 'Version is required')
  assert(otp, 'OTP is required')

  return task(
    subTask(ci)(),
    npmVersion(version, `packages/${packageName}`),
    npmPublish(`packages/${packageName}`, { otp })
  )
}
