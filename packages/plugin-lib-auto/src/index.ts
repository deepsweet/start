import plugin from '@start/plugin/src/'

export const pushCommitsAndTags = plugin('pushCommitsAndTags', () => async () => {
  const { pushCommitsAndTags: push } = await import('@auto/git')

  await push()
})

export * from './repo'
export * from './workspaces'
