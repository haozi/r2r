// 默认配置
const base = {
  lanIp: null,
  path: {
    userDir: null,
    baseDir: process.cwd(),
    src: './src',
    dist: './dist'
  },
  entry: {
    main: './main.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888
  },
  proxy: {
    domains: [],
    rules: []
  },
  js: {
    commons: false, // 是否生成 commons.js 的 chunk
    dropConsole: false, // 移除所有 console
    dropDebugger: true, // 移除所有 debugger
    asciiOnly: false, // 中文转化为 ascii
    showBanner: true, // 显示头部注释
    showVersion: true, // 注释显示版本信息
    showLastUpdate: true, // 注释显示最后更新日期
    showContributors: true // 注释显示开发者，要在 package.json 中配置 contributors 字段，格式为字符串数组
  }
}

export default base
