<template>
  <div class="tag-nav-item">
    <span class="dot" :class="{'active-dot': active}"></span>
    <span class="title">{{title}}</span>
    <span v-if="!hiddenClose" class="el-icon-close" @click.stop="handleClose"></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagNavItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    hiddenClose: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: playload => playload
  },
  setup (props, { emit }) {
    const handleClose = () => {
      emit('close')
    }
    return {
      handleClose
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../../../../styles/index.scss';

.tag-nav-item {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  background: #fff;
  color: #515a6e;
  padding: 0 12px;
  margin: 4px 6px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background: #a6a8ad;
  }

  .active-dot {
    background: $--color-primary;
  }

  .title {
    margin-left: 4px;
    margin-right: 14px;
  }

  .el-icon-close {
    &:hover {
      color: $--color-primary;
    }
  }

  &:hover {
    color: #7a8191;
  }
}
</style>
