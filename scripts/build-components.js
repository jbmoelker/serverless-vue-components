const Promise = require('bluebird')
const Service = require('@vue/cli-service/lib/Service')
const getComponents = require('../lib/get-components')

const service = new Service(process.cwd())

function getConfig({ name }) {
    const args = {
        _: [ 'build', `./src/components/${name}.vue` ],
        modern: false,
        report: false,
        'report-json': false,
        'inline-vue': false,
        watch: false,
        open: false,
        copy: false,
        https: false,
        verbose: false,
        clean: false,
        formats: 'commonjs',
        target: 'lib',
        filename: `components/${name}`
    }
    const rawArgv = [
        'build',
        '--no-clean',
        '--formats',
        'commonjs',
        '--target',
        'lib',
        '--filename',
        `components/${name}`,
        `./src/components/${name}.vue`,
    ]
    return { args, rawArgv }
}

async function buildComponents() {
    const componentNames = await getComponents()
    return Promise.mapSeries(componentNames, name => {
        const { args, rawArgv } = getConfig({ name })
        return service.run('build', args, rawArgv)
    })
}

buildComponents()
    .then(() => console.log('Created all components'))
