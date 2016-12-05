# vuex-breakjs-sync

> Effortlessly keep [BreakJS](https://github.com/nygardk/BreakJS) responsive
> breakpoints and [Vuex](https://github.com/vuejs/vuex) Store in sync.

![vuex-breakjs-sync demo](http://i.imgur.com/GMtTQgG.gif)


### Usage

``` bash
# for vue >= 2.0:
npm install vuex-breakjs-sync
```

``` js
import { sync } from 'vuex-breakjs-sync' // `sync` init method
import store from './vuex/store' // Vuex store instance
import breakjs from 'breakjs' // BreakJS init method

sync(store, breakjs) // done.

// bootstrap your app...
```
### Demo 

``` sh
# run the demo from source
git clone https://github.com/chrisbraddock/vuex-breakjs-sync
cd vuex-breakjs-sync/demo
npm install
npm run dev
```

### How does it work?

- It adds a `breakpoint` module into the store, which contains the state
representing the current breakpoint.

``` js
store.state.breakpoint.current // string current breakpoint e.g. 'tablet'
```

- When BreakJS runs callbacks on breakpoint change, the store's state is updated.



### Customizing Breakpoints


**vuex-breakjs-sync** `breaks` defaults to:

``` js
{
    phone: '320px',
    tablet: '768px',
    desktop: '1024px'
}
```
_\* borrowed from [include-media](http://include-media.com/documentation/#variable-breakpoints)_


The defaults can be overridden by passing a valid [BreakJS layout
object](https://github.com/nygardk/BreakJS#usage) as a parameter
to `sync` .e.g.

``` js
var myBreaks = { ... }
sync(store, breakjs, myBreaks)
```

The default `breaks` object is available as a convenience export from
*vuex-breakjs-sync*:

``` js
import { sync, breaks } from 'vuex-breakjs-sync'
import store from './vuex/store'
import breakjs from 'breakjs'

breaks['phablet'] = 550

sync(store, breakjs, breaks)
```

### License

[MIT](http://opensource.org/licenses/MIT)

### Credit

only minor adaptation to [vue-router-sync](https://github.com/vuejs/vuex-router-sync) was needed for this project
