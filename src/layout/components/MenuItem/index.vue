<template>
  <el-menu-item
    v-if="!menu.children || menu.children.length === 0"
    :index="menu.name"
  >
    <SvgIcon
      v-if="menu.meta && menu.meta.icon"
      class-name="menu-icon"
      :icon="menu.meta.icon"
    />
    <template #title>
      <span>
        {{ menu.meta.title }}
      </span>
    </template>
  </el-menu-item>
  <el-submenu v-else :index="menu.name">
    <template #title>
      <SvgIcon
        v-if="menu.meta && menu.meta.icon"
        class-name="menu-icon"
        :icon="menu.meta.icon"
      />
      <span>{{ menu.meta.title }}</span>
    </template>
    <!-- <el-menu-item-group> -->
    <el-menu-item
      v-for="child in menu.children"
      :key="child.path"
      :index="child.name"
    >
      <SvgIcon
        v-if="menu.meta && menu.meta.icon"
        class-name="menu-icon"
        :icon="child.meta.icon"
      />
      <span>{{ child.meta.title }}</span>
    </el-menu-item>
    <!-- </el-menu-item-group> -->
  </el-submenu>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
.menu-icon {
  margin-right: 10px;
  font-size: 16px;
  vertical-align: -0.25em !important;
}
</style>
