import R2r from './R2r'
function r2r (config) {
  return function (req, res, next) {
    new R2r(config, req, res, next).run()
  }
}

module.exports = r2r.default = r2r.r2r = r2r
