const fs = require('fs').promises

const basename = './dist/HelloWorld'

fs.readFile(`${basename}.css`)
    .then(css => {
        const js = `module.exports = '${css}';`
        return fs.writeFile(`${basename}.css.js`, js)
    })
    .then(() => console.log(`Saved ${basename}.css as js`))