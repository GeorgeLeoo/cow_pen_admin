import { nextTick, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

function useLogin () {
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

  const loginForm = (res: {}) => {
    userFormEl = res
  }

  const handlerLogin = () => {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      userFormEl.validate((valid: any) => {
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
    userForm,
    rules,
    loginForm,
    handlerLogin
  }
}

export default useLogin
