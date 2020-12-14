import HttpRequest from '../libs/HttpRequest'

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const login = (username: string, password: string) => HttpRequest.request({
  url: '/login',
  method: 'post',
  data: { username, password }
})

/**
 * 登录
 * @param token
 */
export const logout = (token: string) => HttpRequest.request({
  url: '/logout',
  method: 'post',
  data: { token }
})

/**
 * 获取用户信息
 * @param token
 */
export const getUserInfo = () => HttpRequest.request({
  url: '/user',
  method: 'get'
})
