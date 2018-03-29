// @flow
import assert from 'assert'
import Sequence from '@start/sequence/src/'
import xargs from '@start/xargs/src/'
import Reporter from '@start/reporter/src/'
import env from '@start/env/src/'
import find from '@start/find/src/'
import findGitStaged from '@start/find-git-staged/src/'
import clean from '@start/clean/src/'
import read from '@start/read/src/'
import babel from '@start/lib-babel/src/'
import rename from '@start/rename/src/'
import write from '@start/write/src/'
import overwrite from '@start/overwrite/src/'
import watch from '@start/watch/src/'
import eslint from '@start/lib-eslint/src/'
import prettierEslint from '@start/lib-prettier-eslint/src/'
import { istanbulInstrument, istanbulReport, istanbulThresholds } from '@start/lib-istanbul/src/'
import tape from '@start/lib-tape/src/'
// import npmVersion from '@start/lib-npm-version/src/'
import npmPublish from '@start/lib-npm-publish/src/'
import tapDiff from 'tap-diff'

const reporter = Reporter()
const sequence = Sequence(reporter)

const babelConfig = {
  babelrc: false,
  retainLines: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6,
        },
        exclude: ['transform-regenerator'],
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import'],
}

export const build = (packageName: string) =>
  sequence(
    env('NODE_ENV', 'production'),
    find(`packages/${packageName}/build/`),
    clean,
    find(`packages/${packageName}/src/**/*.ts`),
    read,
    babel(babelConfig),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write(`packages/${packageName}/build/`)
  )

export const builds = xargs(build)

export const dev = (packageName: string) =>
  sequence(
    find(`packages/${packageName}/build/`),
    clean,
    watch(`packages/${packageName}/src/**/*.ts`)(
      sequence(read, babel(babelConfig), write(`packages/${packageName}/build/`))
    )
  )

export const lint = () =>
  sequence(findGitStaged(['packages/**/@(src|test)/**/*.ts', 'tasks/**/*.ts']), eslint())

export const lintAll = () =>
  sequence(find(['packages/**/@(src|test)/**/*.ts', 'tasks/**/*.ts']), eslint())

export const fix = () =>
  sequence(
    find(['packages/*/@(src|test)/**/*.ts', 'tasks/**/*.ts']),
    read,
    prettierEslint(),
    overwrite
  )

export const test = () =>
  sequence(
    find('packages/**/src/**/*.ts'),
    istanbulInstrument({ esModules: true }, ['.ts']),
    find('packages/**/test/**/*.ts'),
    tape(tapDiff),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({ functions: 30 })
  )

export const ci = () => sequence(lintAll(), test())

export const publish = (packageName: string, /* version: string, */ otp: string) => {
  assert(packageName, 'Package name is required')
  // assert(version, 'Version is required')
  assert(otp, 'OTP is required')

  return sequence(
    ci(),
    build(packageName),
    // npmVersion(version, `packages/${packageName}`),
    npmPublish(`packages/${packageName}`, { otp })
  )
}
