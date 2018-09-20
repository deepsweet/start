import { TOptions } from '@auto/utils'

export default {
  requiredPrefixes: {
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
  customPrefixes: [
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
  ],
  autoNamePrefix: '@start/',
  zeroBreakingChangeType: 'minor',
  initialType: 'minor'
} as TOptions
