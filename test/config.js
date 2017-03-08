// var FS = require('fs')
// var PATH = require('path')
module.exports = {
  server: {
    port: 65432,
    ip: '127.0.0.1'
    // ssl: {
    //   key: FS.readFileSync(PATH.resolve(__dirname, '../ssl/private.pem'), 'utf-8'),
    //   cert: FS.readFileSync(PATH.resolve(__dirname, '../ssl/public.crt'), 'utf-8')
    // }
  },
  // 抓取的资源
  domains: [
    {
      domain: 'news.baidu.com',
      rules: [],
      proxyPass: 'http://127.0.0.1:8080/article'
    }
  ]
}
