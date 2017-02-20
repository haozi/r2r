'use strict'
var app = require('express')()
var r2r = require('../lib/index')
var config = require('./config')

app.use(r2r(config))
app.listen(80)
