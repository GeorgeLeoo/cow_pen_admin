import HttpRequest from '../libs/HttpRequest'

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const login = (username: string, password: string) => HttpRequest.request({
  url: '/user/login',
  method: 'post',
  data: { username, password }
})

/**
 * 登录
 */
export const logout = () => HttpRequest.request({
  url: '/user/logout',
  method: 'patch'
})

/**
 * 获取用户信息
 * @param token
 */
export const getUserInfo = () => HttpRequest.request({
  url: '/user',
  method: 'get'
})
