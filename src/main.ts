import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

import store from './store'

import './permission'

import './element-variables.scss'

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
