/* eslint-disable space-infix-ops */
export type TAnyObject = {
  [key: string]: any
}
export type TKeyOf<T> = Exclude<keyof T, number | symbol>
export type TOmit<T extends {}, K extends PropertyKey> = {
  [P in Exclude<keyof T, K>]: T[P];
}

export type MaybeObject = void | {}

export type TExtend<T1 extends MaybeObject, T2 extends MaybeObject> = (T1 extends void ? {} : {
  [K in Exclude<keyof T1, keyof T2>]: T1[K];
}) & (T2 extends void ? {} : T2)

export type TExtend3<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject> = TExtend<TExtend<T1, T2>, T3>
export type TExtend4<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject> = TExtend<TExtend3<T1, T2, T3>, T4>
export type TExtend5<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject> = TExtend<TExtend4<T1, T2, T3, T4>, T5>
export type TExtend6<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject> = TExtend<TExtend5<T1, T2, T3, T4, T5>, T6>
export type TExtend7<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject> = TExtend<TExtend6<T1, T2, T3, T4, T5, T6>, T7>
export type TExtend8<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject> = TExtend<TExtend7<T1, T2, T3, T4, T5, T6, T7>, T8>
export type TExtend9<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject> = TExtend<TExtend8<T1, T2, T3, T4, T5, T6, T7, T8>, T9>
export type TExtend10<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject, T10 extends MaybeObject> = TExtend<TExtend9<T1, T2, T3, T4, T5, T6, T7, T8, T9>, T10>
export type TExtend11<T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject, T10 extends MaybeObject, T11 extends MaybeObject> = TExtend<TExtend10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>, T11>

export type StartFile = {
  path: string,
  data?: string,
  map?: {}
}

export type StartDataFile = StartFile & {
  data: string
}

export type StartFilesProps = {
  files: StartFile[]
}

export type StartDataFilesProps = {
  files: StartDataFile[]
}

export type StartPluginUtils = {
  reporter: NodeJS.EventEmitter,
  logPath: (path: string) => void,
  logMessage: (message: string) => void,
}

export type StartPluginCallback<P extends {}, R extends MaybeObject> = (utils: StartPluginUtils) => (props: P) => R | Promise<R>
export type StartPluginSync<P extends {}, R extends MaybeObject> = (utils: StartPluginUtils) => (inProps?: P) => Promise<R>
export type StartPlugin<P extends {}, R extends MaybeObject> = StartPluginSync<P, R> | Promise<StartPluginSync<P, R>>

export default <P extends {}, R extends MaybeObject> (name: string, pluginCallback: StartPluginCallback<P, R>): StartPlugin<P, R> => ({ reporter }) => async (inProps?: P): Promise<R> => {
  try {
    reporter.emit('start', name)

    const outProps = await pluginCallback({
      reporter,
      logPath: (path) => reporter.emit('path', name, path),
      logMessage: (message) => reporter.emit('message', name, message)
    })(inProps as P)

    reporter.emit('done', name)

    return outProps
  } catch (error) {
    reporter.emit('error', name, error)

    throw null
  }
}
