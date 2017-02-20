import Base from './Base'
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
  }

  // 为兼容 connect 这里不要返回 Promise
  run () {
    console.log('r2r is running...')
    this.next()
  }
  // 代理转发
  proxy (req, res) {

  }
  // set cache (type, k, v) {
  //   this.cache[type][k] = v
  // }
}
