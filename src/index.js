import R2r from './R2r'
function r2r (options) {
  return function (req, res, next) {
    new R2r(options, req, res, next).run()
  }
}

module.exports = r2r.default = r2r.r2r = r2r
