'use strict'
var http = require('http')
var connect = require('connect')
var r2r = require('../lib/index')
var config = require('./config')

var app = connect().use(r2r(config))

http.createServer(app)
  .listen(80)
