import HTTP from 'http'
// import HTTPS from 'https'
import URL from 'url'
import NET from 'net'
import Base from '../Base'
const base = new Base()
/**
 * @param config 代理服务器配置
 * @param request  [Function] 用来拦截 request 对象
 * @param response [Function] 用来拦截 response对象
 */
export default function (opts) {
  const { config, request, response } = opts
  let { port = 65432 } = config

  let server = HTTP.createServer()

  server.listen(port, '0.0.0.0', function () {
    console.log('proxy server start http://127.0.0.1:%d', port)
  })
  server.on('request', (req, res) => {
    base.types.isFunction(request) && request(req, res)
    base.types.isFunction(response) && response(req, res)
    let u = URL.parse(req.url)
    let options = {
      hostname: u.hostname,
      port: u.port || 80,
      path: u.path,
      method: req.method,
      headers: req.headers
    }
    let proxyRequest = HTTP.request(options, function (proxyRes) {
      proxyRes.headers['X-Hint'] = 'moto'
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res)
    }).on('error', function (e) {
      res.end(e)
    })
    req.pipe(proxyRequest)
  })
  server.on('connect', function (cReq, cSock) {
    let u = URL.parse('http://' + cReq.url)
    let pSock = NET.connect(u.port, u.hostname, function () {
      cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n')
      pSock.pipe(cSock)
    }).on('error', function (e) {
      cSock.end()
    })
  })

  return server
}
