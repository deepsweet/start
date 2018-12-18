import plugin, { StartPluginUtils, StartPlugin, TExtend, TExtend3, TExtend4, TExtend5, TExtend6, TExtend7, TExtend8, TExtend9, TExtend10, TExtend11 } from '@start/plugin/src/'

function sequence<P0, R> (p0: StartPlugin<P0, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend<P0, R>>
function sequence<P0, P1, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend3<P0, P1, R>>
function sequence<P0, P1, P2, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend4<P0, P1, P2, R>>
function sequence<P0, P1, P2, P3, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend5<P0, P1, P2, P3, R>>
function sequence<P0, P1, P2, P3, P4, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend6<P0, P1, P2, P3, P4, R>>
function sequence<P0, P1, P2, P3, P4, P5, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend7<P0, P1, P2, P3, P4, P5, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend8<P0, P1, P2, P3, P4, P5, P6, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, P8, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, P8>, p8: StartPlugin<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, P8>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend10<P0, P1, P2, P3, P4, P5, P6, P7, P8, R>>
function sequence<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, R> (p0: StartPlugin<P0, P1>, p1: StartPlugin<TExtend<P0, P1>, P2>, p2: StartPlugin<TExtend3<P0, P1, P2>, P3>, p3: StartPlugin<TExtend4<P0, P1, P2, P3>, P4>, p4: StartPlugin<TExtend5<P0, P1, P2, P3, P4>, R>, p5: StartPlugin<TExtend6<P0, P1, P2, P3, P4, P5>, P6>, p6: StartPlugin<TExtend7<P0, P1, P2, P3, P4, P5, P6>, P7>, p7: StartPlugin<TExtend8<P0, P1, P2, P3, P4, P5, P6, P7>, P8>, p8: StartPlugin<TExtend9<P0, P1, P2, P3, P4, P5, P6, P7, P8>, P9>, p9: StartPlugin<TExtend10<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9>, R>): (utils: StartPluginUtils) => (props?: P0) => Promise<TExtend11<P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, R>>

function sequence (...plugins: StartPlugin<any, any>[]) {
  return plugin('sequence', (utils) => (props) =>
    plugins.reduce(
      async (prev, next) => {
        const nextPluginRunner = await next
        const prevProps = await prev
        const result = await nextPluginRunner(utils)(prevProps)

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
