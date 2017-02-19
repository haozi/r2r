import R2r from './r2r'

function middleWare (req, res) {
  new R2r().run()
}

module.exports = middleWare.default = middleWare.r2r = middleWare
