var PATH = require('path')
// var URL = require('url')
// var HTTP = require('http')
var motoRequire = require('../lib/util').motoRequire
var proxyHttp = motoRequire(PATH.resolve(`${__dirname}/../lib/proxy/http.js`))
var config = require('./config')

/**
 * 1. 资源访问请求 透过代理
 * 2. 修改 req, res
 * 3. 指向本地 / 原址
 * 4. 转发方式: http => http https => https https => http
 * 5. 非http协议转发
 */
proxyHttp({
  config: config.server
})
