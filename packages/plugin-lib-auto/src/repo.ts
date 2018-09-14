/* eslint-disable no-throw-literal */
import plugin, { StartPluginPropsAfter } from '@start/plugin'
import { TRepoGitBump, TOptions, TRepoPackageBump } from '@auto/utils/src/'

export type TRepoPluginData = {
  packageBump: TRepoPackageBump,
  gitBump: TRepoGitBump
}

export const makeRepoCommit = (options: TOptions) =>
  plugin('makeRepoCommit', async () => {
    const { makeRepoCommit } = await import('@auto/git/src/')

    await makeRepoCommit(options)
  })

export const getRepoPackageBumps = (options: TOptions) =>
  plugin('getRepoPackageBumps', async (): Promise<TRepoPluginData> => {
    const { getRepoPackage } = await import('@auto/fs/src/')
    const { getRepoBump } = await import('@auto/git/src/')
    const { getRepoPackageBump } = await import('@auto/bump/src/')

    const pkg = await getRepoPackage()
    const gitBump = await getRepoBump(options)

    if (gitBump === null) {
      throw new Error('No bumps')
    }

    const packageBump = await getRepoPackageBump(pkg, gitBump, options)

    return {
      packageBump,
      gitBump
    }
  })

export const publishRepoPrompt = (options: TOptions) =>
  plugin('publishRepoPrompt', async (props) => {
    const { getRepoLog } = await import('@auto/log/src/')
    const { default: prompts } = await import('prompts')
    const { packageBump, gitBump } = props as TRepoPluginData & StartPluginPropsAfter

    const log = getRepoLog(packageBump, gitBump)

    console.log('')

    console.log(`${log.type} → v${log.version}\n`)

    log.messages.forEach((message) => {
      console.log(`${options.requiredPrefixes[message.type].value} ${message.value}`)
    })

    console.log('')

    const { isOk } = await prompts({
      type: 'toggle',
      name: 'isOk',
      message: 'Looks good?',
      initial: true,
      active: 'yes',
      inactive: 'no'
    })

    if (typeof isOk === 'undefined' || isOk === false) {
      throw null
    }
  })

export const writeRepoPackageBump = (options: TOptions) =>
  plugin('writeRepoPackageBump', async (props) => {
    const { writeRepoPackageVersion } = await import('@auto/fs/src/')
    const {
      writeRepoPublishCommit,
      writeRepoPublishTag
    } = await import('@auto/git/src/')
    const { packageBump, logMessage } = props as TRepoPluginData & StartPluginPropsAfter

    await writeRepoPackageVersion(packageBump)
    logMessage('write package version')

    await writeRepoPublishCommit(packageBump, options)
    logMessage('write publish commit')

    logMessage('write publish tag')
    await writeRepoPublishTag(packageBump)
  })

export const publishRepoPackageBump = plugin('publishRepoPackageBump', async () => {
  const { publishRepoPackage } = await import('@auto/npm/src/')

  await publishRepoPackage()
})
