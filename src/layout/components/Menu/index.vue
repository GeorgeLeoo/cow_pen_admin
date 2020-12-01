<template>
  <el-menu
    :default-active="menuList[0].path"
    :background-color="variables.menuBg"
    :text-color="variables.menuTextColor"
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
import { defineComponent, ref } from 'vue'

import { useRouter } from 'vue-router'

import MenuItem from '@/layout/components/MenuItem'

import variables from '@/styles/variables.scss'

import routers from '@/router/routes'

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem
  },
  setup () {
    const menuList = ref([])

    routers.forEach(_ => {
      if (_.name === 'Layout') {
        menuList.value = _.children
      }
    })

    const router = useRouter()

    const handlerMenuSelect = indexPath => {
      router.push(indexPath)
    }

    return {
      variables,
      menuList,
      handlerMenuSelect
    }
  }
})
</script>

<style></style>
