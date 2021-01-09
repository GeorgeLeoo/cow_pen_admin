<template>
<div class="login">
  <div class="login-card">
    <el-card>
      <template #header>
        <div>
          <span>欢迎登录</span>
        </div>
      </template>
      <el-form :ref="loginForm" :model="userForm" :rules="rules" status-icon label-width="0">
        <el-form-item prop="username">
          <el-input size="small" prefix-icon="el-icon-user"  type="text" v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="small" prefix-icon="el-icon-lock" type="password" v-model="userForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-button size="small" class="login-btn" type="primary" @click="handlerLogin">登 录</el-button>
      </el-form>
    </el-card>
  </div>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import useLogin from './useLogin'

export default defineComponent({
  name: 'Login',
  setup () {
    const login = useLogin()

    return {
      ...login
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  .login-card {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 310px;
    ::v-deep .el-card__header {
      padding: 12px 20px!important;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
