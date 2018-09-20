/* eslint-disable no-throw-literal */
import plugin, { StartPlugin, StartPluginPropsAfter } from '@start/plugin/src/'
import { TWorkspacesGitBump, TOptions, TWorkspacesPackageBump } from '@auto/utils'

export type TWorkspacesPluginData = {
  packagesBumps: TWorkspacesPackageBump[],
  gitBumps: TWorkspacesGitBump[]
}

export const makeWorkspacesCommit = (options: TOptions) =>
  plugin('makeWorkspacesCommit', async () => {
    const { getWorkspacesPackages } = await import('@auto/fs')
    const { makeWorkspacesCommit } = await import('@auto/git')

    const packages = await getWorkspacesPackages()

    await makeWorkspacesCommit(packages, options)
  })

export const getWorkspacesPackagesBumps = (options: TOptions) =>
  plugin('getWorkspacesPackagesBumps', async () => {
    const { getWorkspacesPackages } = await import('@auto/fs')
    const { getWorkspacesBumps } = await import('@auto/git')
    const { getWorkspacesPackagesBumps } = await import('@auto/bump')

    const packages = await getWorkspacesPackages()
    const gitBumps = await getWorkspacesBumps(packages, options)

    if (gitBumps.length === 0) {
      throw new Error('No bumps')
    }

    const packagesBumps = await getWorkspacesPackagesBumps(packages, gitBumps, options)

    return {
      packagesBumps,
      gitBumps
    }
  })

export const publishWorkspacesPrompt = (options: TOptions) =>
  plugin('publishWorkspacesPrompt', async (props) => {
    const { getWorkspacesLog } = await import('@auto/log')
    const { default: prompts } = await import('prompts')
    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData & StartPluginPropsAfter

    const logs = getWorkspacesLog(packagesBumps, gitBumps, options)

    logs.forEach((log) => {
      console.log('')

      console.log(`${log.name} → ${log.type} → v${log.version}\n`)

      log.messages.forEach((message) => {
        console.log(`${options.requiredPrefixes[message.type].value} ${message.value}`)
      })
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

export const buildBumpedPackages = (task: (...args: any[]) => StartPlugin) =>
  plugin('buildBumpedPackages', async (props) => {
    const path = await import('path')
    const { packagesBumps, reporter } = props as TWorkspacesPluginData & StartPluginPropsAfter

    for (const bump of packagesBumps) {
      const packageDir = path.relative(path.resolve('packages/'), bump.dir)
      const taskRunner = await task(packageDir)

      await taskRunner({ reporter })
    }
  })

export const writeWorkspacesPackagesBumps = (options: TOptions) =>
  plugin('writeWorkspacesPackagesBumps', async (props) => {
    const { writePackageDependencies, writeWorkspacesPackageVersion } = await import('@auto/fs')
    const {
      writeWorkspacesDependenciesCommit,
      writeWorkspacesPublishCommit,
      writeWorkspacesPublishTag
    } = await import('@auto/git')
    const { packagesBumps, logMessage } = props as TWorkspacesPluginData & StartPluginPropsAfter

    for (const bump of packagesBumps) {
      logMessage(bump.name)

      await writePackageDependencies(bump)
      logMessage('write package dependencies')

      await writeWorkspacesDependenciesCommit(bump, options)
      logMessage('write dependencies commit')

      await writeWorkspacesPackageVersion(bump)
      logMessage('write package version')

      await writeWorkspacesPublishCommit(bump, options)
      logMessage('write publish commit')

      logMessage('write publish tag')
      await writeWorkspacesPublishTag(bump, options)
    }
  })

export const publishWorkspacesPackagesBumps = (options: TOptions) =>
  plugin('publishWorkspacesPackagesBumps', async (props) => {
    const { publishWorkspacesPackage } = await import('@auto/npm')
    const { packagesBumps } = props as TWorkspacesPluginData & StartPluginPropsAfter

    for (const bump of packagesBumps) {
      await publishWorkspacesPackage(bump, options)
    }
  })

export const sendWorkspacesSlackMessage = (options: TOptions) =>
  plugin('sendWorkspacesSlackMessage', async (props) => {
    const { getWorkspacesLog, sendWorkspacesSlackMessage: send } = await import('@auto/log')

    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData & StartPluginPropsAfter
    const logs = getWorkspacesLog(packagesBumps, gitBumps, options)

    await send(logs, process.env.SLACK_WEBHOOK_TOKEN, options)
  })

export const makeWorkspacesGithubReleases = (options: TOptions) =>
  plugin('makeWorkspacesGithubReleases', async (props) => {
    const { getWorkspacesLog, makeWorkspacesGithubReleases: make } = await import('@auto/log')

    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData & StartPluginPropsAfter
    const logs = getWorkspacesLog(packagesBumps, gitBumps, options)

    await make(logs, process.env.GITHUB_RELEASE_TOKEN, options)
  })
