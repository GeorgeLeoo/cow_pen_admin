<template>
  <span class="tab-nav-arrow">
    <i :class="directionClass"></i>
  </span>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'TagNavArrow',
  props: {
    direction: {
      type: String,
      default: 'left'
    }
  },
  setup (props) {
    const directionClass = computed(() => 'el-icon-arrow-' + props.direction)

    return {
      directionClass
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../../../../styles/index.scss';
.tab-nav-arrow {
  display: inline-block;
  width: 28px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background: #fff;
  font-weight: bold;
  font-size: 18px;
  vertical-align: top;
  color: rgb(87, 87, 87);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: $--color-primary;
  }
}
</style>
