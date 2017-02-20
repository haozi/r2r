import Base from './Base'
export default class extends Base {
  constructor (options = {}, req, res, next) {
    super()
    this.options = options
    this.req = req
    this.res = res
    this.next = next
  }

  run () {
    console.log('r2r is run')
    this.next()
  }
}
