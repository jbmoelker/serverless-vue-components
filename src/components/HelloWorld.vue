<template>
  <div class="hello">
    <h1>Hello {{ msg }}</h1>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Jasper',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello { color: red; }
</style>
