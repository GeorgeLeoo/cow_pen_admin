import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

import store from './store'

import './permission'

import './styles/index.scss'

// 引入svg-icon
// import '@/assets/icons/index'
import SvgIcon from '@/components/SvgIcon/index.vue'

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
