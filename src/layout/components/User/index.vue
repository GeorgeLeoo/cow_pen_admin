<template>
  <el-dropdown trigger="click" @command="handlerUserMenuClick">
    <span class="el-dropdown-link">
      <el-badge is-dot class="badge">
        <el-avatar
          class="avatar"
          :size="30"
          icon="el-icon-user-solid"
        ></el-avatar>
      </el-badge>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="msg">
          <el-badge :value="100" :max="10" class="item">
            消息中心
          </el-badge>
        </el-dropdown-item>
        <el-dropdown-item
          command="profile"
          >个人中心</el-dropdown-item
        >
        <el-dropdown-item
          command="logout"
          divided
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'User',
  emits: {
    userMenuClick: playload => playload
  },
  setup (props, { emit }) {
    const handlerUserMenuClick = command => {
      emit('user-menu-click', command)
    }
    return {
      handlerUserMenuClick
    }
  }
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
