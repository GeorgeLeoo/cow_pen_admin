<template>
  <div class="tag-nav-scroller">
    <TagNavArrow direction="left" />
    <div class="tag-nav-scroller__container">
      <slot></slot>
    </div>
    <TagNavArrow direction="right"/>
    <TagNavClose/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import TagNavArrow from '../TagNavArrow'
import TagNavClose from '../TagNavClose'

export default defineComponent({
  name: 'TagNavScroller',
  components: {
    TagNavArrow,
    TagNavClose
  }
})
</script>

<style scoped lang="scss">
.tag-nav-scroller {
  height: 100%;
  width: 100%;

  .tag-nav-scroller__container {
    display: inline-block;
    width: calc(100% - 85px);
    height: 38px;
    white-space: nowrap;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
