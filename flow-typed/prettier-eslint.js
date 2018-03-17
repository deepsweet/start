// https://github.com/prettier/prettier-eslint

declare module 'prettier-eslint' {
  declare type PrettierEslintOptions = {|
    text: string,
    filePath?: string,
    // TODO: link to EslintOptions type
    eslintConfig?: {},
    // TODO: link to PrettierOptions type
    prettierOptions?: {},
    // TODO: link to EslintOptions type
    fallbackPrettierOptions?: {},
    logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent',
    eslintPath?: string,
    prettierPath?: string,
    prettierLast?: boolean,
  |}

  declare module.exports: {
    (options: PrettierEslintOptions): string,
  }
}
