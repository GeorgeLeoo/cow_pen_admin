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

<script>
import { defineComponent, reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()

    const userForm = reactive({
      username: 'admin',
      password: 'admin'
    })

    let userFormEl = reactive({})

    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    })

    const loginForm = (res) => {
      userFormEl = res
    }

    const handlerLogin = () => {
      nextTick(() => {
        userFormEl.validate((valid) => {
          if (valid) {
            store.dispatch('login', userForm).then(() => {
              router.push({ name: 'Home' })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    }

    return {
      rules,
      userForm,
      handlerLogin,
      loginForm
    }
  },
  methods: {}
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
