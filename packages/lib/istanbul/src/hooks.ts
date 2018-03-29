let hooks = []

export const add = (hook: () => void) => {
  hooks.push(hook)
}

export const clearAll = () => {
  hooks = hooks.filter((hook) => {
    hook()

    return false
  })
}
