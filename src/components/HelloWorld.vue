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
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello { color: red; }
</style>
