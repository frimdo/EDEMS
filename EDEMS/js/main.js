var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')

$(document).ready(function () {
  LS.initGlobals()
  gui.drawMicrocode()
  gui.refresh()
})
