<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-badge is-dot class="badge">
        <el-avatar class="avatar" :size="30" icon="el-icon-user-solid"></el-avatar>
      </el-badge>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-badge :value="100" :max="10" class="item">
            消息中心
          </el-badge>
        </el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'User'
})
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
}
.avatar {
  vertical-align: top;
}
.el-icon-arrow-down {
  vertical-align: middle;
}
.badge {
  height: 30px;
}
</style>
