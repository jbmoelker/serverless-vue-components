const ejs = require('ejs')
const fse = require('fs-extra')
const markdownIt = require('markdown-it')()
const Promise = require('bluebird')
const vuedocJson = require('@vuedoc/parser')
const vuedocMd = require('@vuedoc/md')
const getComponents = require('../lib/get-components')
require('dotenv-safe').config()

const baseUrl = process.env.URL

async function getComponentData({ name }) {
    const [data, markdown] = await Promise.all([
        vuedocJson.parse({ filename: `src/components/${name}.vue` }),
        vuedocMd.md({ 
            filename: `src/components/${name}.vue`,
            parsing: {
                features: ['props', 'slots'],
            },
        }),
    ])
    return { data, markdown }
}

async function renderComponentDocs({ name, data, markdown }) {
    const template = await fse.readFile('src/docs.html', 'utf8')
    const docs = markdownIt.render(markdown)
    const configValue = JSON.stringify({
        props: data.props.reduce((out, prop) => ({ ...out, [prop.name]: prop.default || null }),{}),
        slots: data.slots.reduce((out, slot) => ({ ...out, [slot.name]: '' }),{}),
    }, null, 2)
    const html = ejs.render(template, { baseUrl, configValue, docs, name })
    return html
}

async function saveComponentDocs({ name, html }) {
    const js = `module.exports = \`${html}\`;`
    return fse.outputFile(`dist/components/${name}.html.js`, js)
}

async function buildComponentDocs() {
    const componentNames = await getComponents()
    return Promise.mapSeries(componentNames, async (name) => {
        const { data, markdown } = await getComponentData({ name })
        const html = await renderComponentDocs({ name, data, markdown })
        return saveComponentDocs({ name, html })
    })
}

buildComponentDocs()
    .then(() => console.log('Created component docs as .html.js'))
