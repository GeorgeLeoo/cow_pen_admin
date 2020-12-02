<template>
  <el-menu
    :default-active="menuList[0].path"
    :background-color="variables.menuBg"
    :text-color="variables.menuTextColor"
    :collapse="isCollapse"
    @select="handlerMenuSelect"
  >
    <MenuItem
      v-for="menu in menuList"
      :key="menu.name"
      :menu="menu"
    />
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue'

import { useRouter } from 'vue-router'

import MenuItem from '@/layout/components/MenuItem'

import variables from '@/styles/variables.scss'

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem
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
  },
  setup () {
    const router = useRouter()

    const handlerMenuSelect = indexPath => {
      router.push(indexPath)
    }

    return {
      variables,
      handlerMenuSelect
    }
  }
})
</script>

<style></style>
