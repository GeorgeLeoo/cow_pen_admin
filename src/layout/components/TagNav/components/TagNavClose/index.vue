<template>
  <span class="tab-nav-close">
    <i class="el-icon-circle-close"></i>
  </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagNavClose'
})
</script>

<style scoped lang="scss">
@import '../../../../../styles/index.scss';
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

  &:hover {
    color: $--color-primary;
  }
}
</style>
