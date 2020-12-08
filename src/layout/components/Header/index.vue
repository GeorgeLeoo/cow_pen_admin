<template>
  <div class="header">
    <div class="header__left">
      <SiderTrigger
        class="header__left-item"
        :isCollapse="isCollapse"
        @menu-trigger="handlerMenuTrigger"
      />
      <BreadCrumb class="header__left-item bread-crumb" />
    </div>
    <div class="header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import SiderTrigger from '@/layout/components/SiderTrigger'
import BreadCrumb from '@/layout/components/BreadCrumb'

import { dispatchMenuTrigger } from '@/layout/components/common'

export default defineComponent({
  name: 'Header',
  components: {
    SiderTrigger,
    BreadCrumb
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    return {
      ...dispatchMenuTrigger(emit)
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  .header__left {
    float: left;
    .header__left-item {
      display: inline-block;
    }
    .bread-crumb {
      margin-left: 30px;
    }
  }
  .header__right {
    float: right;
  }
}
</style>
