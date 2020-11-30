export default {
  /**
   * @description 配置浏览器标签的title
   */
  title: 'cow_pen_admin',
  footerTitle: 'GeorgeLeeo',
  /**
   * @description token 在 cookie 中存储的天数
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化
   * 若不使用，则需要在路由中给需要在菜单中展示的路由奢者meta: {title: 'xxx'}
   * 用来在菜单中显示
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '/',
    pro: ''
  },
  /**
   * @description 默认打开的首页的路由 name 值，默认为 home
   */
  homeName: 'home',
  /**
   * @description 加载的插件
   */
  plugin: {
    'error-store': {
      // 设为 false 不会在顶部显示错误日志徽标
      showInHeader: true,
      // 设为 true 后在开发环境不会收集错误信息，方便开发中错误排查
      developmentOff: true
    }
  }
}
