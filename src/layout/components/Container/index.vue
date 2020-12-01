<template>
  <el-container>
    <el-header>
      <Header/>
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

export default defineComponent({
  name: 'Container',
  components: {
    Header,
    Footer
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
