import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getPageTitle } from '@/utils'
import store from '@/store'

const LOGIN_PAGE_NAME = 'login'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  store.dispatch('setTagNavList', to)
  store.dispatch('breadCrumbList', to)

  NProgress.start()
  next()
})

router.afterEach(to => {
  document.title = getPageTitle(to.meta.title)
  NProgress.done()
})
