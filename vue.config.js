// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const devServerPort = 9092

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

const proxyTargetMap = {
  prod: 'https://xxx.xxx.com/',
  dev: 'http://localhost:7001/',
  test: 'http://test.xxx.com',
  local: 'http://localhost:7001/'
}
const proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.local

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@@', resolve('src/components'))

    const svgRule = config.module.rule('svg')
    const terser = config.optimization.minimizer('terser')
    // 清除默认的 svgRule
    svgRule.uses.clear()

    svgRule
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 排除 其他的 svg 使用 svg-sprite-loader
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('./src/assets/icons'))
    terser.tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
  devServer: {
    port: devServerPort,
    open: true,
    proxy: {
      '/': {
        target: proxyTarget,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
