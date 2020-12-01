<template>
<el-container>
  <Sider/>
  <Container />
</el-container>
</template>

<script>
import { defineComponent } from 'vue'
import Sider from './components/Sider'
import Container from './components/Container'

export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    Container
  }
})
</script>

<style scoped lang="scss">
.aside {
  width: 200px;
  background-color: menuBg;
}
</style>
