module.exports = {
  server: {
    port: 65432,
    ip: '127.0.0.1'
  },
  domain: [
    'news.baidu.com'
  ],

  proxyPass: [
    {
      host: 'news.baidu.com',
      protocol: 'http',
      path: '/article/2017-02/10168295.html?from=bdwz',
      match: /^article(.*)/,
      local: 'http://127.0.0.1:8080'
    }
  ]
}
