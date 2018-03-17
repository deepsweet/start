declare module 'globby' {
  declare type Glob = string | string[]
  declare type GlobbyOptions = {}

  declare module.exports: {
    (glob: Glob, options?: GlobbyOptions): Promise<string[]>,
  }
}
