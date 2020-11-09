const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const HelloWorld = require('../dist/HelloWorld.common.js')
const css = require('../dist/HelloWorld.css.js')

exports.handler = async function(event) {
    // todo: use POST requests with payload instead of query string params
    const { queryStringParameters } = event

    const app = new Vue({
        components: { HelloWorld },
        data: {
            ssrProps: {
              msg: queryStringParameters.msg,
            },
        },
        template: `<HelloWorld v-bind="ssrProps"></HelloWorld>`
    })
    const html = await renderer.renderToString(app)
    return {
        statusCode: 200,
        body: `${html}<style>${css}</style>`
    }
}
