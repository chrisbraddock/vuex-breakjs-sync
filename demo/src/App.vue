<template>

    <div id="app">
        <h1>current: <span class="active">{{ breakpoint.current || 'unknown' }}</span></h1>
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

        <pre v-html="JSONHighlight(breakpoint)"></pre>
    </div>

</template>

<script type="text/babel">
    import { mapState } from 'vuex'
    export default {
        name: 'app',
        computed: mapState({
            breakpoint:     (state) => state.breakpoint,
            current:        (state) => state.breakpoint.name,
            atLeast:        (state) => state.breakpoint.atLeast,
            atMost:         (state) => state.breakpoint.atMost,
            is:             (state) => state.breakpoint.is,
            lessThan:       (state) => state.breakpoint.lessThan
        }),
        methods: {
            // only needed for prettying up the demo
            JSONHighlight(json) {
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 1);
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
    body { font-family: Arial, Helvetica, sans-serif; }
    h1 { margin-left: 0.5em; }
    th, td { text-align: center; }
    td { padding: 0.5em 0.5em; color: white; }
    td.active { background-color: green; }
    td.inactive { background-color: #AAAAAA; }
    span.active { color: green; }
    pre { font-size: 0.8em; line-height: 1em; }
    .string { color: orange; font-weight: bold; }
    .number { color: darkorange; }
    .boolean { color: darkgray; }
    .boolean.true { color: green; font-weight: bold; }
    .null { color: magenta; }
    .key { color: gray; }
</style>
