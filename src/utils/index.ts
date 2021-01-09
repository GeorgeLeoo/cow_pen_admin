import config from '@/config'
import routers from '@/router/routes'
import { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import { ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/lib/el-message/src/types'

export const TOKEN_KEY = 'token'

export function getPageTitle (pageTitle: string) {
  const title = config.title
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}

export function setPageTitle (pageTitle: string) {
  const title = config.title
  let _title = ''
  if (pageTitle) {
    _title = `${pageTitle} | ${title}`
  }
  _title = `${title}`
  document.title = _title
}

export function getMenuList () {
  let menuList: RouteRecordRaw[] = []

  routers.forEach(_ => {
    if (_.name === 'Layout') {
      const _menuList = _.children
      if (_menuList) {
        menuList = _menuList
      }
    }
  })
  return menuList
}

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  }
  return false
}

// 定义一个深拷贝函数  接收目标target参数
export function deepClone (target: object): number | null | string | undefined | {} | [] {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

export function bubbleSort (arr: [], prop: string, isDesc: boolean) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (Number(arr[j][prop]) > Number(arr[j + 1][prop])) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  if (isDesc) {
    arr.reverse()
  }
  return arr
}

export const confirm = (msg: string, title: string, type?: MessageType) => {
  if (!type) {
    type = 'warning'
  }
  return ElMessageBox.confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

export const alter = (msg: string, title: string, type?: MessageType) => {
  if (!type) {
    type = 'warning'
  }
  return ElMessageBox.alert(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}
