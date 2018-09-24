import { TGitOptions } from '@auto/git'
import { TFsOptions } from '@auto/fs'
import { TBumpOptions } from '@auto/bump'
import { TGithubOptions } from '@auto/log'
import { TPrefixes } from '@auto/utils'

export const prefixes: TPrefixes = {
  required: {
    major: {
      title: 'Breaking change',
      value: '💥'
    },
    minor: {
      title: 'New feature',
      value: '➕'
    },
    patch: {
      title: 'Bugfix',
      value: '✔️'
    },
    publish: {
      title: 'New version',
      value: '📦'
    },
    dependencies: {
      title: 'Dependencies',
      value: '♻️'
    },
    initial: {
      title: 'Initial',
      value: '🐣'
    }
  },
  custom: [
    {
      title: 'Dependencies',
      value: '♻️'
    },
    {
      title: 'Lint',
      value: '🚷'
    },
    {
      title: 'Test',
      value: '👾'
    },
    {
      title: 'Docs',
      value: '📝'
    },
    {
      title: 'Demo',
      value: '📺'
    },
    {
      title: 'Refactor',
      value: '🛠'
    },
    {
      title: 'WIP',
      value: '🚧'
    },
    {
      title: 'Other',
      value: '🛠'
    }
  ]
}

export const fsOptions: TFsOptions = { autoNamePrefix: '@start/' }

export const gitOptions: TGitOptions = { initialType: 'minor' }

export const bumpOptions: TBumpOptions = { zeroBreakingChangeType: 'minor' }

export const githubOptions: TGithubOptions = {
  username: 'deepsweet',
  repo: 'start',
  token: process.env.GITHUB_RELEASE_TOKEN
}
