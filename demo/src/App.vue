<template>

    <div id="app">
        <h1>{{ breakpoint || 'unknown' }}</h1>
        <table>
            <tr>
                <th v-bind:class="{ active: isPhone }">isPhone</th>
                <th v-bind:class="{ active: isPhablet }">isPhablet</th>
                <th v-bind:class="{ active: isTablet }">isTablet</th>
                <th v-bind:class="{ active: isDesktop }">isDesktop</th>
            </tr>
            <tr>
                <td v-bind:class="{ active: isPhone }">{{ isPhone }}</td>
                <td v-bind:class="{ active: isPhablet }">{{ isPhablet }}</td>
                <td v-bind:class="{ active: isTablet }">{{ isTablet }}</td>
                <td v-bind:class="{ active: isDesktop }">{{ isDesktop }}</td>
            </tr>
        </table>
    </div>

</template>

<script type="text/babel">
    import { mapState } from 'vuex'
    export default {
        name: 'app',
        computed: mapState({
            breakpoint:     (state) => state.breakpoint.current,
            isPhone:        (state) => state.breakpoint.current === 'phone',
            isPhablet:      (state) => state.breakpoint.current === 'phablet',
            isTablet:       (state) => state.breakpoint.current === 'tablet',
            isDesktop:      (state) => state.breakpoint.current === 'desktop'
        })
    }
</script>

<style type="text/css">
    body { font-family: Arial, Helvetica, sans-serif;}
    h1 { margin-left: .5em; }
    table { font-size: .8em; }
    th { padding: .2em .3em; }
    th, td { text-align: center; }
    th.active { background-color: green; }
    td.active { color: red; text-decoration: underline; }
</style>
