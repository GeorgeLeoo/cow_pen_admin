<template>
<el-container>
  <Sider
    :menuList="menuList"
    :isCollapse="isCollapse"
  >
    <template #logo>
      <h1 class="logo">
        {{ isCollapse ? 'CPA' : 'Cow Pen Admin' }}
      </h1>
    </template>
  </Sider>
  <el-container>
    <el-header>
      <Header
        :isCollapse="isCollapse"
        @menu-trigger="handlerMenuTrigger"
      >
        <template #right>
          <FullScreen v-model="isFullscreen" />
          <User />
        </template>
      </Header>
    </el-header>
    <el-main class="main">
      <TagNav />
      <router-view />
    </el-main>
      <Footer/>
  </el-container>
</el-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Sider from '@/layout/components/Sider'
import Header from '@/layout/components/Header'
import Footer from '@/layout/components/Footer'
import User from '@/layout/components/User'
import TagNav from '@/layout/components/TagNav'
import FullScreen from '@/layout/components/FullScreen'

import { getMenuList } from '@/utils'

export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    Header,
    Footer,
    User,
    TagNav,
    FullScreen
  },
  setup () {
    const menuList = ref(getMenuList())

    const isCollapse = ref(false)
    const isFullscreen = ref(false)

    const handlerMenuTrigger = () => {
      isCollapse.value = !isCollapse.value
    }

    return {
      menuList,
      isCollapse,
      handlerMenuTrigger,
      isFullscreen
    }
  }
})
</script>

<style scoped lang="scss">
.logo {
  text-align: center;
  color: #fff;
  margin: 0;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
}
.main {
  background-color: white;
  height: calc(100vh - 120px);
  overflow: auto;
  padding: 0;
}
</style>
