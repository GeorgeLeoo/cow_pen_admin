<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <el-tooltip
      class="item"
      effect="dark"
      :content="value ? '退出全屏' : '全屏'"
      placement="bottom"
    >
      <SvgIcon
        class-name="menu-icon"
        :icon="value ? 'exit_full_screen' : 'full_screen'"
        @click="handleChange"
      />
    </el-tooltip>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'FullScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const showFullScreenBtn = computed(() => {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    })
    const handleFullscreen = () => {
      const main = document.body
      if (props.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    }
    const handleChange = () => {
      handleFullscreen()
    }

    onMounted(() => {
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      isFullscreen = !!isFullscreen
      document.addEventListener('fullscreenchange', () => {
        emit('input', !props.value)
        emit('on-change', !props.value)
      })
      document.addEventListener('mozfullscreenchange', () => {
        emit('input', !props.value)
        emit('on-change', !props.value)
      })
      document.addEventListener('webkitfullscreenchange', () => {
        emit('input', !props.value)
        emit('on-change', !props.value)
      })
      document.addEventListener('msfullscreenchange', () => {
        emit('input', !props.value)
        emit('on-change', !props.value)
      })
      emit('input', isFullscreen)
    })

    return {
      showFullScreenBtn,
      handleChange
    }
  }
})
</script>

<style lang="scss">
.full-screen-btn-con {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  .menu-icon {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
