const Vuedoc = require('@vuedoc/parser')
const options = {
  filename: 'src/components/HelloWorld.vue'
}

Vuedoc.parse(options)
  .then((component) => console.log(component))
  .catch((err) => console.error(err))