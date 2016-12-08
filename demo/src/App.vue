<template>

    <div id="app">
        <h1>{{ current }}</h1>

        <table class="breaks">
            <td class="break" v-bind:class="{ active: isPhone }">phone</td>
            <td class="break" v-bind:class="{ active: atLeastPhone }">&gt;= phone</td>
            <td class="break" v-bind:class="{ active: atMostPhone }">&lt;= phone</td>
            <td class="break" v-bind:class="{ active: isPhablet }">phablet</td>
            <td class="break" v-bind:class="{ active: atLeastPhablet }">&gt;= phablet</td>
            <td class="break" v-bind:class="{ active: atMostPhablet }">&lt;= phablet</td>
            <td class="break" v-bind:class="{ active: isTablet }">tablet</td>
            <td class="break" v-bind:class="{ active: atLeastTablet }">&gt;= tablet</td>
            <td class="break" v-bind:class="{ active: atMostTablet }">&lt;= tablet</td>
            <td class="break" v-bind:class="{ active: isDesktop }">desktop</td>
            <td class="break" v-bind:class="{ active: atLeastDesktop }">&gt;= desktop</td>
            <td class="break" v-bind:class="{ active: atMostDesktop }">&lt;= desktop</td>
        </table>

        <h2>state.breakpoint object:</h2>
        <pre v-html="JSONHighlight(obj)"></pre>
    </div>

</template>

<script type="text/babel">
    import { mapState } from 'vuex'
    export default {
        name: 'app',
        computed: mapState({
            obj:            (state) => state.breakpoint,
            current:        (state) => state.breakpoint.name,
            isPhone:        (state) => state.breakpoint['is-phone'],
            atLeastPhone:   (state) => state.breakpoint['atLeast-phone'],
            atMostPhone:    (state) => state.breakpoint['atMost-phone'],
            isPhablet:      (state) => state.breakpoint['is-phablet'],
            atLeastPhablet: (state) => state.breakpoint['atLeast-phablet'],
            atMostPhablet:  (state) => state.breakpoint['atMost-phablet'],
            isTablet:       (state) => state.breakpoint['is-tablet'],
            atLeastTablet:  (state) => state.breakpoint['atLeast-tablet'],
            atMostTablet:   (state) => state.breakpoint['atMost-tablet'],
            isDesktop:      (state) => state.breakpoint['is-desktop'],
            atLeastDesktop: (state) => state.breakpoint['atLeast-desktop'],
            atMostDesktop:  (state) => state.breakpoint['atMost-desktop'],
        }),
        methods: {
            // only needed for prettying up the demo
            JSONHighlight(json) {
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true/.test(match)) {
                        cls = 'boolean true';
                    } else if (/false/.test(match)) {
                        cls = 'boolean false';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
    }
</script>

<style type="text/css">
    body { font-family: Arial, Helvetica, sans-serif;}
    h1, h2 { margin-left: 50px; }
    pre { font-size: 1.3em; line-height: 1.3em; margin-left: 4em; }
    .string { color: orange; font-weight: bold; }
    .number { color: darkorange; }
    .boolean { color: darkgray; }
    .boolean.true { color: green; font-weight: bold; }
    .null { color: magenta; }
    .key { color: gray; }
    .breaks { font-size: .6em; margin-bottom: 4em; text-align: center; }
    .break { padding: .3em; }
    .break.active { background-color: green; color: white; }
</style>
