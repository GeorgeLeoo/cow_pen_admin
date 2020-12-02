<template>
  <div class="tag-nav">
    <TagNavScroller>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
      <TagNavItem/>
    </TagNavScroller>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import TagNavItem from './components/TagNavItem'
import TagNavScroller from './components/TagNavScroller'

export default defineComponent({
  name: 'TagNav',
  components: {
    TagNavItem,
    TagNavScroller
  }
})
</script>

<style scoped lang="scss">
.tag-nav {
  box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
  background: rgb(240, 240, 240);
  height: 38px;
  border-top: 1px solid rgb(226, 226, 226);
  border-bottom: 1px solid rgb(226, 226, 226);
  user-select: none;
}
</style>
