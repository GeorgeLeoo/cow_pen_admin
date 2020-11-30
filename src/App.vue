<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@mixin size{
  width: 100%;
  height: 100%;
}
html,body{
  @include size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  @include size;
}
</style>
