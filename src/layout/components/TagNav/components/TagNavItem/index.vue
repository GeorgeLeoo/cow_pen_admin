<template>
  <div class="tag-nav-item">
    <span class="dot"></span>
    <span class="title">首页</span>
    <span class="el-icon-close"></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagNavItem'
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
