<template>
  <!--
    aria-hidden="true" 对于屏幕阅读器可以跳过该元素
  -->
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="symbolName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
requireAll(req)

export default defineComponent({
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const symbolName = computed(() => `#icon-${props.icon}`)
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className
      }
      return 'svg-icon'
    })

    return {
      symbolName,
      svgClass
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
