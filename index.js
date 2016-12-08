// defaults from http://include-media.com/documentation/#variable-breakpoints
exports.breaks = {
    phone: 320,
    tablet: 768,
    desktop: 1024
}

// Generate the object that will be stored on the breakpoint module
function breakpointObj(breakjs) {
    var breakpoint = {
        name: breakjs.current()
    }
    breakjs.breakpoints.forEach(function(b) {
        var name = b.name
        breakpoint['is-' + name] = breakjs.is(name)
        breakpoint['atLeast-' + name] = breakjs.atLeast(name)
        breakpoint['atMost-' + name] = breakjs.atMost(name)
    })
    return breakpoint
}

exports.sync = function (store, breakjs, breaks) {
    patchStore(store)

    var commit = store.commit || store.dispatch

    // Init BreakJS
    // breakjs is only useful to use as the return
    // value of its init function, hence overwrite it
    breakjs = breakjs(breaks || exports.breaks)

    // Record initial breakpoint
    commit('breakpoint/BREAKPOINT_CHANGED', breakpointObj(breakjs))

    // Record breakpoint on breakpoint change
    breakjs.addChangeListener(function () {
        commit('breakpoint/BREAKPOINT_CHANGED', breakpointObj(breakjs))
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
    set(store.state, 'breakpoint', {})
    applyMutationState(store, false);

    var breakpointModule = {
        mutations: {
            'breakpoint/BREAKPOINT_CHANGED': function (state, breakpoint) {
                set(store.state, 'breakpoint', breakpoint)
            }
        }
    }

    // add module
    if (store.registerModule) { store.registerModule('breakpoint', breakpointModule) }
    else if (store.module)  { store.module('breakpoint', breakpointModule) }
    else { store.hotUpdate({ modules: {  breakpoints: breakpointModule } }) }
}
