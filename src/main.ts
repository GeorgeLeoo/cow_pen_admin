import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

import store from './store'

import './permission'

import './styles/index.scss'

// 引入svg-icon
// import '@/assets/icons/index'

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
