<template>
<el-aside class="aside">
  <div>logo</div>
  <Menu />
</el-aside>
</template>

<script>
import { defineComponent } from 'vue'
import Menu from '@/layout/components/Menu'

export default defineComponent({
  name: 'Sider',
  components: {
    Menu
  }
})
</script>

<style scoped lang="scss">
@import './src/styles/variables.scss';
.aside {
  width: 200px!important;
  background-color: $menuBg;
  .el-menu {
    border-right-width: 0;
  }
}
</style>
