import Base from './Base'
export default class extends Base {
  constructor (options, req, res, next) {
    super()
    this.options = options
    this.req = req
    this.res = res
    this.next = next
  }

  // 为兼容 connect 这里不要返回 Promise
  run () {
    console.log('r2r is running...')
    this.next()
  }
}