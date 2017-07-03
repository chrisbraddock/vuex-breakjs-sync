// defaults from http://include-media.com/documentation/#variable-breakpoints
exports.breaks = {
    phone: 320,
    tablet: 768,
    desktop: 1024
}

exports.sync = function (store, breakjs, breaks) {
    patchStore(store)

    var commit = store.commit || store.dispatch

    // Init BreakJS
    // breakjs is only useful to use as the return
    // value of its init function, hence overwrite it
    breakjs = breakjs(breaks || exports.breaks)

    function setBreak() {
        var breakpoint = {
            breakjs:  breakjs,
            current:  breakjs.current(),
            is:       {},
            atMost:   {},
            atLeast:  {},
            lessThan: {},
        }

        breakjs.breakpoints.forEach(function (value, index, array) {
            breakpoint.atLeast[value.name] = breakjs.atLeast(value.name)
            breakpoint.atMost[value.name] = breakjs.atMost(value.name)
            breakpoint.is[value.name] = value.name === breakpoint.current
            breakpoint.lessThan[value.name] = !breakjs.atLeast(value.name)
        })

        commit('breakpoint/BREAKPOINT_CHANGED', breakpoint)
    }

    // record the initial breakpoint
    setBreak()

    store.state.breakpoint.breakjs.addChangeListener(setBreak)
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
