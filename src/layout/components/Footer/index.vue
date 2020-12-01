<template>
<el-footer class="footer">
{{footerTitle}}
</el-footer>
</template>

<script>
import { defineComponent } from 'vue'
import config from '@/config'

export default defineComponent({
  name: 'Footer',
  setup () {
    return {
      footerTitle: config.footerTitle
    }
  }
})
</script>

<style lang="scss">
.footer {
  background: #f5f7f9;
  padding: 24px 50px;
  color: #515a6e;
  font-size: 14px;
  line-height: 60px;
  text-align: center;
}
</style>
