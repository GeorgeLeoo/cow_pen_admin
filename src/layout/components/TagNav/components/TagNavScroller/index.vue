<template>
  <div class="tag-nav-scroller">
    <TagNavArrow direction="left" @click="handlerScroller(-200)"/>
    <div ref="scrollerContainer" class="tag-nav-scroller__inner">
        <slot></slot>
    </div>
    <TagNavArrow direction="right" @click="handlerScroller(200)"/>
    <TagNavClose @close="handlerClose"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import TagNavArrow from '../TagNavArrow'
import TagNavClose from '../TagNavClose'

import { scrollTo } from '@/utils/scroll-to'

export default defineComponent({
  name: 'TagNavScroller',
  components: {
    TagNavArrow,
    TagNavClose
  },
  props: {
    itemLength: {
      type: Number,
      default: 0
    }
  },
  emits: {
    close: playload => playload
  },
  setup (props, { emit }) {
    const handlerClose = type => {
      emit('close', type)
    }

    return {
      handlerClose
    }
  },
  methods: {
    handlerScroller (offset) {
      const el = this.$refs.scrollerContainer
      if (el) {
        scrollTo(el, offset + el.scrollLeft)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.tag-nav-scroller {
  height: 100%;
  width: 100%;

  .tag-nav-scroller__inner {
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
