// https://babeljs.io/docs/usage/api

declare module '@babel/core' {
  declare type BabelTransformOptions = {|
    ast?: boolean,
    auxiliaryCommentAfter?: null | string,
    auxiliaryCommentBefore?: null | string,
    babelrc?: boolean,
    code?: boolean,
    comments?: boolean,
    compact?: boolean | 'auto',
    env?: {},
    extends?: null | string,
    filename?: string,
    filenameRelative?: string,
    // TODO: define generator options
    generatorOpts?: {},
    getModuleId?: null | string,
    highlightCode?: boolean,
    ignore?: null | string | any[],
    inputSourceMap?: boolean | {},
    minified?: boolean,
    moduleId?: null | string,
    moduleIds?: boolean,
    moduleRoot?: string,
    only?: null | string | any[],
    // TODO: define parser options
    parserOpts?: {},
    plugins?: string[],
    presets?: any[],
    retainLines?: boolean,
    resolveModuleSource?: null | ((source: string, filename: string) => string),
    shouldPrintComment?: null | ((comment: string) => boolean),
    sourceFileName?: string,
    sourceMaps?: boolean | 'both' | 'inline',
    sourceMapTarget?: string,
    sourceRoot?: string,
    sourceType?: 'module' | 'script',
    // TODO: define function type
    wrapPluginVisitorMethod?: null | ((...args: any[]) => any),
  |}

  declare type BabelTransformResult = {|
    code?: string,
    map?: {},
    ast?: {},
  |}

  declare module.exports: {
    transform(code: string, options?: BabelTransformOptions): BabelTransformResult,

    transformFile(
      filename: string,
      options?: BabelTransformOptions,
      callback: (error: Error | null, result: BabelTransformResult) => void
    ): void,

    transformFileSync(filename: string, options?: BabelTransformOptions): BabelTransformResult,

    transformFromAst(ast: {}, code?: string, options?: BabelTransformOptions): BabelTransformResult,
  }
}
