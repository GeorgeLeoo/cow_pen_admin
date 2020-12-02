<template>
  <el-container>
    <el-header>
      <Header
        :isCollapse="isCollapse"
        @menu-trigger="handlerMenuTrigger"
      />
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
      <Footer/>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'

import Header from '@/layout/components/Header'
import Footer from '@/layout/components/Footer'
import { dispatchMenuTrigger } from '@/layout/components/common'

export default defineComponent({
  name: 'Container',
  components: {
    Header,
    Footer
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    return {
      ...dispatchMenuTrigger(emit)
    }
  }
})
</script>

<style scoped lang="scss">
.main {
  background-color: white;
  height: calc(100vh - 120px);
  overflow: auto;
}
</style>
