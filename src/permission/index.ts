import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getPageTitle, getToken } from '@/utils'
import store from '@/store'

const LOGIN_PAGE_NAME = 'Login'
const HOME_NAME = 'Home'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  store.dispatch('setTagNavList', to)
  store.dispatch('breadCrumbList', to)
  NProgress.start()

  const token = getToken()

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: HOME_NAME // 跳转到homeName页
    })
  } else {
    next()
    // if (store.state.user.hasGetInfo) {
    //   turnTo(to, store.state.user.access, next)
    // } else {
    //   store.dispatch('getUserInfo').then(user => {
    //     // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
    //     turnTo(to, user.access, next)
    //   }).catch(() => {
    //     setToken('')
    //     next({
    //       name: 'login'
    //     })
    //   })
    // }
  }
})

router.afterEach(to => {
  document.title = getPageTitle(to.meta.title)
  NProgress.done()
})
