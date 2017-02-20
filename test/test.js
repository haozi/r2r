'use strict'
var app = require('express')()
var r2r = require('../lib/index')

app.use(r2r({

}))
app.listen(80)
