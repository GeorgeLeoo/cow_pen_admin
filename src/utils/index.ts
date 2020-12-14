import config from '@/config'
import routers from '@/router/routes'
import { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

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
