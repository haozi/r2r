import Http from 'http'
import Https from 'https'
import HttpProxy from 'http-proxy'

export default function (opts) {
  const { config, request, response } = opts
  let { port = 65432, ssl } = config
  let server = ssl ? Https.createServer() : Http.createServer()

  server.listen(port, '0.0.0.0', function () {
    console.log('proxy server start http://127.0.0.1:%d', port)
  })

  const proxy = HttpProxy.createProxyServer({})

  server.on('request', (req, res) => {
    request(req, res)
  })
  server.on('response', (req, res) => {
    response(req, res)
  })

  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('X-Hint', 'moto')
  })

  return {
    server,
    proxy
  }
}
