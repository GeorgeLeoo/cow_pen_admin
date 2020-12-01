<template>
  <el-menu-item :index="menu.path">
    <i class="el-icon-document"></i>
    <template #title>{{menu.meta.title}}</template>
  </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style></style>
