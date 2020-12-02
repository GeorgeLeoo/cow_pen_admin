<template>
  <SvgIcon
    class-name="menu-trigger"
    :icon="menuTriggerIcon"
    @click="handlerMenuTrigger"
  />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { dispatchMenuTrigger } from '@/layout/components/common'

export default defineComponent({
  name: 'SiderTrigger',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const menuTriggerIcon = computed(() => props.isCollapse ? 'menuOn' : 'menuOff')

    return {
      menuTriggerIcon,
      ...dispatchMenuTrigger(emit)
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../../styles/index.scss';

.menu-trigger {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: color 0.3s;
  &:hover {
    color: $--color-primary;
  }
}
</style>
