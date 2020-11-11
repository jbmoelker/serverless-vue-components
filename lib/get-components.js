const glob = require('fast-glob')
const path = require('path')

const rootDir = path.join(__dirname, '../')
const componentDir = path.join(rootDir, 'src/components/')
const componentExt = '.vue'

module.exports = () => {
    return glob(`*${componentExt}`, { cwd: componentDir })
        .then(filenames => filenames.map(filename => path.basename(filename, componentExt)))
}
