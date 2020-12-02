<template>
<el-aside
  :class="[
    'aside',
    isCollapse ? 'aside-collapsed' : 'aside-collapse'
  ]"
>
  <div>
    <slot name="logo"></slot>
  </div>
  <Menu
    :menuList="menuList"
    :isCollapse="isCollapse"
  />
</el-aside>
</template>

<script>
import { defineComponent } from 'vue'
import Menu from '@/layout/components/Menu'

export default defineComponent({
  name: 'Sider',
  components: {
    Menu
  },
  props: {
    menuList: {
      type: Array,
      default: () => { return [] }
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
@import './src/styles/variables.scss';
.aside {
  background-color: $menuBg;
  transition: width 0.3s ease-out;
  .el-menu {
    border-right-width: 0;
  }
}
.aside-collapsed {
  width: 64px!important;
}
.aside-collapse {
  width: 200px!important;
}
</style>
