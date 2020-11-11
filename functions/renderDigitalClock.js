const middy = require('@middy/core')
const httpMultipartBodyParser = require('@middy/http-multipart-body-parser')
const renderer = require('vue-server-renderer').createRenderer()
const Vue = require('vue')

const DigitalClock = require('../dist/components/DigitalClock.common.js')
const css = require('../dist/components/DigitalClock.css.js')
const docsHtml = require('../dist/components/DigitalClock.html.js')

async function handler(event) {
    const { httpMethod } = event
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
        components: { DigitalClock },
        data: {
            ssrProps: {},
        },
        template: `<DigitalClock v-bind="ssrProps"></DigitalClock>`
    })
    const html = await renderer.renderToString(app)
    return {
        statusCode: 200,
        body: `${html}<style>${css}</style>`
    }
}

exports.handler = middy(handler)
    .use(httpMultipartBodyParser())