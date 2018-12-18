/* eslint-disable no-throw-literal */
import plugin, { StartPlugin } from '@start/plugin/src/'
import { TWorkspacesGitBump, TWorkspacesPackageBump, TPrefixes, TWorkspacesOptions } from '@auto/utils'
import { TGitOptions } from '@auto/git'
import { TBumpOptions } from '@auto/bump'
import { TNpmOptions } from '@auto/npm'
import { TSlackOptions, TGithubOptions, TWorkspacesLog } from '@auto/log'

export type TWorkspacesPluginData = {
  packagesBumps: TWorkspacesPackageBump[],
  gitBumps: TWorkspacesGitBump[]
}

export const makeWorkspacesCommit = (prefixes: TPrefixes, workspacesOptions: TWorkspacesOptions) =>
  plugin('makeWorkspacesCommit', () => async () => {
    const { getWorkspacesPackages } = await import('@auto/fs')
    const { makeWorkspacesCommit } = await import('@auto/git')

    const packages = await getWorkspacesPackages(workspacesOptions)

    await makeWorkspacesCommit(packages, prefixes)
  })

export const getWorkspacesPackagesBumps = (prefixes: TPrefixes, gitOptions: TGitOptions, bumpOptions: TBumpOptions, workspacesOptions: TWorkspacesOptions) =>
  plugin('getWorkspacesPackagesBumps', () => async () => {
    const { getWorkspacesPackages } = await import('@auto/fs')
    const { getWorkspacesBumps } = await import('@auto/git')
    const { getWorkspacesPackagesBumps } = await import('@auto/bump')

    const packages = await getWorkspacesPackages(workspacesOptions)
    const gitBumps = await getWorkspacesBumps(packages, prefixes, gitOptions)

    if (gitBumps.length === 0) {
      throw new Error('No bumps')
    }

    const packagesBumps = await getWorkspacesPackagesBumps(packages, gitBumps, bumpOptions, workspacesOptions)

    return {
      packagesBumps,
      gitBumps
    }
  })

export const publishWorkspacesPrompt = (prefixes: TPrefixes) =>
  plugin('publishWorkspacesPrompt', () => async (props) => {
    const { getWorkspacesLog } = await import('@auto/log')
    const { default: prompts } = await import('prompts')
    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData

    const logs = getWorkspacesLog(packagesBumps, gitBumps)

    logs.forEach((log) => {
      console.log('')

      console.log(`${log.name} → ${log.type} → v${log.version}\n`)

      log.messages.forEach((message) => {
        console.log(`${prefixes.required[message.type].value} ${message.value}`)
      })
    })

    console.log('')

    const { isOk } = await prompts({
      type: 'toggle',
      name: 'isOk',
      message: 'Looks good?',
      initial: false,
      active: 'yes',
      inactive: 'no'
    })

    if (typeof isOk === 'undefined' || isOk === false) {
      throw null
    }
  })

export const buildBumpedPackages = (task: (packageDir: string) => StartPlugin<any, any>) =>
  plugin('buildBumpedPackages', (utils) => async (props: TWorkspacesPluginData) => {
    const path = await import('path')
    const { packagesBumps } = props

    for (const bump of packagesBumps) {
      const packageDir = path.relative(path.resolve('packages/'), bump.dir)
      const taskRunner = await task(packageDir)

      await taskRunner(utils)()
    }
  })

export const writeWorkspacesPackagesBumps = (prefixes: TPrefixes, workspacesOptions: TWorkspacesOptions) =>
  plugin('writeWorkspacesPackagesBumps', ({ logMessage }) => async (props) => {
    const { writePackageDependencies, writeWorkspacesPackageVersion } = await import('@auto/fs')
    const {
      writeWorkspacesDependenciesCommit,
      writeWorkspacesPublishCommit,
      writeWorkspacesPublishTag
    } = await import('@auto/git')
    const { packagesBumps } = props as TWorkspacesPluginData

    for (const bump of packagesBumps) {
      logMessage(bump.name)

      await writePackageDependencies(bump, workspacesOptions)
      logMessage('write package dependencies')

      await writeWorkspacesDependenciesCommit(bump, prefixes)
      logMessage('write dependencies commit')

      await writeWorkspacesPackageVersion(bump)
      logMessage('write package version')

      await writeWorkspacesPublishCommit(bump, prefixes)
      logMessage('write publish commit')

      await writeWorkspacesPublishTag(bump)
      logMessage('write publish tag')
    }
  })

export const publishWorkspacesPackagesBumps = (npmOptions?: TNpmOptions) =>
  plugin('publishWorkspacesPackagesBumps', () => async (props) => {
    const { publishWorkspacesPackage } = await import('@auto/npm')
    const { packagesBumps } = props as TWorkspacesPluginData

    for (const bump of packagesBumps) {
      await publishWorkspacesPackage(bump, npmOptions)
    }
  })

export const sendWorkspacesSlackMessage = (prefixes: TPrefixes, slackOptions: TSlackOptions, transformFn?: (logs: TWorkspacesLog[]) => TWorkspacesLog[]) =>
  plugin('sendWorkspacesSlackMessage', () => async (props) => {
    const { getWorkspacesLog, sendWorkspacesSlackMessage: send } = await import('@auto/log')

    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData
    let logs = getWorkspacesLog(packagesBumps, gitBumps)

    if (typeof transformFn === 'function') {
      logs = transformFn(logs)
    }

    await send(logs, prefixes, slackOptions)
  })

export const makeWorkspacesGithubReleases = (prefixes: TPrefixes, githubOptions: TGithubOptions) =>
  plugin('makeWorkspacesGithubReleases', () => async (props) => {
    const { getWorkspacesLog, makeWorkspacesGithubReleases: make } = await import('@auto/log')

    const { packagesBumps, gitBumps } = props as TWorkspacesPluginData
    const logs = getWorkspacesLog(packagesBumps, gitBumps)

    await make(logs, prefixes, githubOptions)
  })
