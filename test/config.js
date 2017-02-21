module.exports = {
  server: {
    port: 65432,
    ip: '127.0.0.1'
  },
  // 抓取的资源
  domains: [
    {
      domain: 'china.huanqiu.com',
      rules: [],
      proxyPass: 'http://127.0.0.1:8080/article'
    }
  ]
}
