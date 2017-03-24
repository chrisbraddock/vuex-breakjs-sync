<template>

    <div id="app">
        <h1>current: <span class="active">{{ breakpoint || 'unknown' }}</span></h1>
        <table>
            <tr>
                <th>phone</th>
                <th>phablet</th>
                <th>tablet</th>
                <th>desktop</th>
            </tr>
            <tr>
                <template v-for="(value, key) in atLeast">
                    <td v-bind:class="{ active: value, inactive: !value }">atLeast.{{ key }}</td>
                </template>
            </tr>
            <tr>
                <td v-bind:class="{ active: isPhone, inactive: !isPhone }">isPhone</td>
                <td v-bind:class="{ active: isPhablet, inactive: !isPhablet }">isPhablet</td>
                <td v-bind:class="{ active: isTablet, inactive: !isTablet }">isTablet</td>
                <td v-bind:class="{ active: isDesktop, inactive: !isDesktop }">isDesktop</td>
            </tr>
            <tr>
                <template v-for="(value, key) in is">
                    <td v-bind:class="{ active: value, inactive: !value }">is.{{ key }}</td>
                </template>
            </tr>
            <tr>
                <template v-for="(value, key) in atMost">
                    <td v-bind:class="{ active: value, inactive: !value }">atMost.{{ key }}</td>
                </template>
            </tr>
            <tr>
                <template v-for="(value, key) in lessThan">
                    <td v-bind:class="{ active: value, inactive: !value }">lessThan.{{ key }}</td>
                </template>
            </tr>
        </table>
    </div>

</template>

<script type="text/babel">
    import { mapState } from 'vuex'
    export default {
        name: 'app',
        computed: mapState({
            breakpoint: (state) => state.breakpoint.current,
            isPhone:    (state) => state.breakpoint.current === 'phone',
            isPhablet:  (state) => state.breakpoint.current === 'phablet',
            isTablet:   (state) => state.breakpoint.current === 'tablet',
            isDesktop:  (state) => state.breakpoint.current === 'desktop',
            atLeast:    (state) => state.breakpoint.atLeast,
            atMost:     (state) => state.breakpoint.atMost,
            is:         (state) => state.breakpoint.is,
            lessThan:   (state) => state.breakpoint.lessThan,
        })
    }
</script>

<style type="text/css">
    body { font-family: Arial, Helvetica, sans-serif;}
    h1 { margin-left: .5em; }
    th, td { text-align: center; }
    td { padding: .5em .5em; color: white; }
    td.active { background-color: green; }
    td.inactive { background-color: #AAAAAA; }
    span.active { color: green; }
</style>
