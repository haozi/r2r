import Base from './Base'
import proxy from './proxy'
const hostMark = '# moto'

export default class extends Base {
  constructor (config, req, res, next) {
    super()
    this.config = config
    this.req = req
    this.res = res
    this.next = next
    this.cache = {
      memory: {},
      local: {}
    }
    this.proxyServer = null
  }

  // 为兼容 connect 这里不要返回 Promise
  run () {
    const { server, proxy } = proxy({
      config: this.config.server,
      request (req, res) {
        proxy.web(req, res, {
        })
      },
      response (req, res) {

      }
    })
    this.next()
  }

  /**
   * 将ip和domain匹配 写入到host
   */
  _writeHost (ip, domain) {
    return this.runBash(`echo "${ip} ${domain} ${hostMark}" >> /etc/hosts`)
  }
  /**
   * 读取已标记的ip domain
   */
  _readHost () {
    const reg = new RegExp(`\\s*(.+)\\s+(.+)\\s+${hostMark}$`)
    let ret
    return this.read('/etc/hosts').then(content => {
      return content.split('\n').filter(Boolean).map(line => {
        ret = line.match(reg)
        if (ret) {
          ret.shit()
          return ret
        }
      })
    })
  }
}
