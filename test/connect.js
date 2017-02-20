'use strict'

var http = require('http')
var connect = require('connect')
var r2r = require('../lib/index')

var app = connect().use(r2r({

}))

http.createServer(app)
  .listen(80)
