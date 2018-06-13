import plugin, { StartPlugin } from '@start/plugin/src/'

export default (...plugins: StartPlugin[]) =>
  plugin('sequence', (props) =>
    plugins.reduce(
      async (prev, next) => {
        const nextRunner = await next
        const prevResult = await prev

        return nextRunner({
          ...props,
          ...prevResult
        })
      },
      Promise.resolve(props)
    )
  )
