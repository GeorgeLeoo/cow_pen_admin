<template>
  <el-dropdown
    trigger="click"
    class="tab-nav-close__wrapper"
    @command="handlerCommand"
  >
    <span class="tab-nav-close">
      <i class="el-icon-circle-close"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="ALL">关闭所有</el-dropdown-item>
        <el-dropdown-item command="OTHER">关闭其他</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagNavClose',
  emits: {
    close: playload => playload
  },
  setup (props, { emit }) {
    const handlerCommand = type => {
      emit('close', type)
    }

    return {
      handlerCommand
    }
  }
})
</script>

<style lang="scss">
@import "../../../../../styles/index.scss";
.tab-nav-close__wrapper {
  vertical-align: top;
}
.tab-nav-close {
  display: inline-block;
  width: 28px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background: #fff;
  font-weight: bold;
  font-size: 18px;
  vertical-align: top;
  cursor: pointer;
  color: rgb(87, 87, 87);
  transition: all 0.3s;
  border-left: 1px solid rgb(231, 231, 231);
  outline: none;
  vertical-align: top;

  &:hover {
    color: $--color-primary;
  }
}
</style>
