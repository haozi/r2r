'use strict'
var app = require('express')()
var r2r = require('../lib/index')

app.use(r2r({
    domain: [
      'news.baidu.com'
    ],

  proxy_pass : [
    {
      host: 'news.baidu.com',
      protocol: 'http',
      path: '/article/2017-02/10168295.html?from=bdwz'
      match: /^article(.*)/,
      local: 'http://127.0.0.1:8080',
    }
  ]
}))
app.listen(80)
