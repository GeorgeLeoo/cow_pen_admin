<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="item in breadCrumbList"
      :key="item.name"
      :to="(!item.redirect && item.name !== $route.name) ? { name: item.name } : ''"
    >
      {{ (item.meta && item.meta.title) ? item.meta.title : item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'BreadCrumb',
  computed: {
    ...mapGetters(['breadCrumbList'])
  },
  setup () {
    return {
    }
  }
})
</script>

<style>

</style>
