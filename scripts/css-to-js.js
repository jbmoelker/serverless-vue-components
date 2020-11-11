const fse = require('fs-extra')
const Promise = require('bluebird')
const getComponents = require('../lib/get-components')

async function transformComponents() {
    const componentNames = await getComponents()
    return Promise.mapSeries(componentNames, async (name) => {
        const basename = `./dist/components/${name}`
        const exists = await fse.pathExists(`${basename}.css`)
        if (!exists) return Promise.resolve()
        const css = await fse.readFile(`${basename}.css`)
        const js = `module.exports = '${css}';`
        return fse.outputFile(`${basename}.css.js`, js)
    })
}

transformComponents()
    .then(() => console.log('Transformed .css files to .js files'))
