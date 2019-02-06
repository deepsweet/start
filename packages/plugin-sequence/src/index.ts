/* eslint-disable space-infix-ops */
import plugin, { StartPlugin, StartReporter, MaybeObject } from '@start/plugin/src/'

export type TExtend <T1 extends MaybeObject, T2 extends MaybeObject> = (T1 extends void ? {} : {
  [K in Exclude<keyof T1, keyof T2>]: T1[K];
}) & (T2 extends void ? {} : T2)

export type TExtend3 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject> = TExtend<TExtend<T1, T2>, T3>
export type TExtend4 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject> = TExtend<TExtend3<T1, T2, T3>, T4>
export type TExtend5 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject> = TExtend<TExtend4<T1, T2, T3, T4>, T5>
export type TExtend6 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject> = TExtend<TExtend5<T1, T2, T3, T4, T5>, T6>
export type TExtend7 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject> = TExtend<TExtend6<T1, T2, T3, T4, T5, T6>, T7>
export type TExtend8 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject> = TExtend<TExtend7<T1, T2, T3, T4, T5, T6, T7>, T8>
export type TExtend9 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject> = TExtend<TExtend8<T1, T2, T3, T4, T5, T6, T7, T8>, T9>
export type TExtend10 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject, T10 extends MaybeObject> = TExtend<TExtend9<T1, T2, T3, T4, T5, T6, T7, T8, T9>, T10>
export type TExtend11 <T1 extends MaybeObject, T2 extends MaybeObject, T3 extends MaybeObject, T4 extends MaybeObject, T5 extends MaybeObject, T6 extends MaybeObject, T7 extends MaybeObject, T8 extends MaybeObject, T9 extends MaybeObject, T10 extends MaybeObject, T11 extends MaybeObject> = TExtend<TExtend10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>, T11>

function sequence<P0, R>(p0: StartPlugin<P0, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend<P0, R>>
function sequence<P0, P1, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend3<P0, P1, R>>
function sequence<P0, P1, P2, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend4<P0, P1, P2, R>>
function sequence<P0, P1, P2, P3, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend5<P0, P1, P2, P3, R>>
function sequence<P0, P1, P2, P3, P4, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend6<P0, P1, P2, P3, P4, R>>
function sequence<P0, P1, P2, P3, P4, P5, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, P5>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend7<P0, P1, P2, P3, P4, P5, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, P5>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend8<P0, P1, P2, P3, P4, P5, P6, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, P5>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, P8, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, P5>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, P8>, p8: StartPlugin<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, P8>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend10<P0, P1, P2, P3, P4, P5, P6, P7, P8, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, P5>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, P8>, p8: StartPlugin<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, P8>, P9>, p9: StartPlugin<TExtend10<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9>, R>): (reporter: StartReporter) => (props?: P0) => Promise<TExtend11<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, R>>

function sequence (...plugins: StartPlugin<any, any>[]) {
  return plugin('sequence', ({ reporter }) => (props) =>
    plugins.reduce(
      async (prev, next) => {
        const nextPluginRunner = await next
        const prevProps = await prev
        const result = await nextPluginRunner(reporter)(prevProps)

        return {
          ...prevProps,
          ...result
        }
      },
      Promise.resolve(props)
    )
  )
}

export default sequence
