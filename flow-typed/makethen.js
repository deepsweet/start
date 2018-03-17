declare module 'makethen' {
  declare module.exports: {
    (fn: (...args: any[]) => void): (...args: any[]) => Promise<any>,
  }
}
