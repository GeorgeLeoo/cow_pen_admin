<template>
  <div class="tag-nav">
    <TagNavScroller
      @close="handlerClose($event)"
    >
      <TagNavItem
        v-for="(tag, index) in tagNavList"
        :key="tag.name"
        :active="tag.path === $route.path"
        :hidden-close="tag.name === 'Home'"
        :title="tag.meta.title"
        @click="handlerTo(tag)"
        @close="handlerClose('ITEM', tag, index)"
      />
    </TagNavScroller>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import TagNavItem from './components/TagNavItem'
import TagNavScroller from './components/TagNavScroller'
import { mapGetters } from 'vuex'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'TagNav',
  components: {
    TagNavItem,
    TagNavScroller
  },
  computed: {
    ...mapGetters(['tagNavList'])
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const handlerClose = (type, tag, index) => {
      const name = route.name
      store.dispatch('removeTagNav', { name, type, index }).then(front => {
        if (type === 'ITEM') {
          if (tag.name === route.name) {
            router.push({ name: front.name })
          }
        }
        if (type === 'ALL') {
          router.push({ name: front.name })
        }
      })
    }

    const handlerTo = tag => {
      router.push({ name: tag.name })
    }

    return {
      handlerClose,
      handlerTo
    }
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
