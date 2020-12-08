import { RouteRecordRaw } from 'vue-router'

import Home from '../views/Home/index.vue'
import Layout from '@/layout/index.vue'
import Panel from '@/components/Panel/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'home'
        }
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue'),
        meta: {
          title: '关于',
          icon: 'mine'
        }
      },
      {
        path: '/error',
        name: 'Error',
        redirect: '/error/404',
        component: Panel,
        meta: {
          title: 'Error',
          icon: 'find'
        },
        children: [
          {
            path: '404',
            name: '404',
            component: () => import(/* webpackChunkName: "about" */ '../views/Error/404/index.vue'),
            meta: {
              title: '404',
              icon: 'money'
            }
          },
          {
            path: '401',
            name: '401',
            component: () => import(/* webpackChunkName: "about" */ '../views/Error/401/index.vue'),
            meta: {
              title: '401',
              icon: 'msg'
            }
          }
        ]
      },
      {
        path: '/parent',
        name: 'Parent',
        redirect: '/parent/4041',
        component: Panel,
        meta: {
          title: 'parent',
          icon: 'chat'
        },
        children: [
          {
            path: '4041',
            name: '4041',
            component: () => import(/* webpackChunkName: "about" */ '../views/Error/404/index.vue'),
            meta: {
              title: '4041',
              icon: 'like'
            }
          },
          {
            path: '4012',
            name: '4012',
            component: () => import(/* webpackChunkName: "about" */ '../views/Error/401/index.vue'),
            meta: {
              title: '4012',
              icon: 'ok'
            }
          }
        ]
      }
    ]
  }
]

export default routes
