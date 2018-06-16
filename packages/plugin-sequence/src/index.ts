import plugin, { StartPlugin } from '@start/plugin/src/'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', (props) =>
    plugins.reduce(
      async (prev, next) => {
        const nextPlugin = await next
        const prevResult = await prev

        return nextPlugin(prevResult)
      },
      Promise.resolve(props)
    )
  )
