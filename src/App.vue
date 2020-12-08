<template>
  <router-view />
</template>

<script>
import store from '@/store'
import routes from '@/router/routes'

export default {
  name: 'App',
  setup () {
    store.dispatch('setRoutes', routes)
  }
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
