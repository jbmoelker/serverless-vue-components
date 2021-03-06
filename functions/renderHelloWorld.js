const middy = require('@middy/core')
const httpMultipartBodyParser = require('@middy/http-multipart-body-parser')
const renderer = require('vue-server-renderer').createRenderer()
const Vue = require('vue')

const HelloWorld = require('../dist/components/HelloWorld.common.js')
const css = require('../dist/components/HelloWorld.css.js')
const docsHtml = require('../dist/components/HelloWorld.html.js')

async function handler(event) {
    const { httpMethod, queryStringParameters } = event
    console.log(event)
    // todo: use POST requests with payload instead of query string params
    if (!['GET','POST'].includes(httpMethod)) {
        return {
            statusCode: 405,
            body: `Invalid HTTP method: ${httpMethod}`
        }
    }
    if('GET' === httpMethod) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: docsHtml,
        }
    }

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

exports.handler = middy(handler)
    .use(httpMultipartBodyParser())