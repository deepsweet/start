import Sequence from '@start/sequence/src/'
import Parallel from '@start/parallel/src/'
import xargs from '@start/xargs/src/'
import Reporter from '@start/reporter/src/'
import assert from '@start/assert/src/'
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
import typescriptGenerate from '@start/lib-typescript-generate/src/'
// import npmVersion from '@start/lib-npm-version/src/'
import npmPublish from '@start/lib-npm-publish/src/'
import tapDiff from 'tap-diff'

const reporter = Reporter()
const sequence = Sequence(reporter)
const parallel = Parallel()

const babelConfig = {
  babelrc: false,
  retainLines: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 8,
        },
        exclude: ['transform-regenerator'],
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
}

export const dts = (packageName: string) =>
  sequence(
    assert(packageName, 'package name is required'),
    find(`packages/${packageName}/src/**/*.ts`),
    // FIXME using TypeScript API even if it's horrible
    typescriptGenerate(`packages/${packageName}/build/`, [
      '--lib',
      'esnext',
      '--allowSyntheticDefaultImports',
    ])
  )

export const build = (packageName: string) =>
  sequence(
    assert(packageName, 'package name is required'),
    env('NODE_ENV', 'production'),
    find(`packages/${packageName}/build/`),
    clean,
    find(`packages/${packageName}/src/**/*.ts`),
    read,
    babel(babelConfig),
    prettierEslint(),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write(`packages/${packageName}/build/`)
  )

export const pack = (packageName: string) =>
  sequence(
    assert(packageName, 'package name is required'),
    env('NODE_ENV', 'production'),
    find(`packages/${packageName}/build/`),
    clean,
    parallel(build, dts)(packageName)
  )

export const packs = xargs(pack)

export const dev = (packageName: string) =>
  sequence(
    assert(packageName, 'package name is required'),
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
    istanbulReport(['lcovonly', 'html', 'text-summary'])
    // istanbulThresholds({ functions: 30 })
  )

export const ci = () => sequence(lintAll(), test())

export const publish = (packageName: string, /* version: string, */ otp: string) =>
  sequence(
    assert(packageName, 'package name is required'),
    // assert(version, 'package name is required'),
    assert(packageName, 'OTP is required'),
    ci(),
    pack(packageName),
    // npmVersion(version, `packages/${packageName}`),
    npmPublish(`packages/${packageName}`, { otp })
  )
