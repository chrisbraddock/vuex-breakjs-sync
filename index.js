// defaults from http://include-media.com/documentation/#variable-breakpoints
exports.breaks = {
    phone: 320,
    tablet: 768,
    desktop: 1024
}

exports.sync = function (store, breakjs, breaks) {
    patchStore(store)

    var commit = store.commit || store.dispatch

    // init and store BreakJS
    commit('breakpoint/SET_BREAKJS', breakjs(breaks || exports.breaks))

    // record the initial breakpoint
    commit('breakpoint/BREAKPOINT_CHANGED', store.state.breakpoint.breakjs.current())

    store.state.breakpoint.breakjs.addChangeListener(function (breakpoint) {
        commit('breakpoint/BREAKPOINT_CHANGED', breakpoint)
    })

}

function applyMutationState (store, state) {
    // support above 2.0
    if (store.hasOwnProperty('_committing')) {
        return store._committing = state
    }
    return store._dispatching = state
}

function patchStore (store) {
    // add state
    var set = store._vm.constructor.set
    applyMutationState(store, true);
    set(store.state, 'breakpoint', {
        breakjs: null,
        current: ''
    })
    applyMutationState(store, false);

    var breakpointModule = {
        mutations: {
            'breakpoint/SET_BREAKJS': function (state, breakjs) {
                set(store.state.breakpoint, 'breakjs', breakjs)
            },
            'breakpoint/BREAKPOINT_CHANGED': function (state, breakpoint) {
                set(store.state.breakpoint, 'current', breakpoint)
            }
        }
    }

    // add module
    if (store.registerModule) {
        store.registerModule('breakpoint', breakpointModule)
    } else if (store.module) {
        store.module('breakpoint', breakpointModule)
    } else {
        store.hotUpdate({
            modules: {
                breakpoint: breakpointModule
            }
        })
    }
}
