var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')

$(document).ready(function () {
  LS.initGlobals()
  gui.drawMicrocode()
  gui.refresh()

  global.microcode[0] = '000'
  global.microcode[1] = '100'
  global.microcode[2] = '200'
  global.microcode[3] = '300'
  global.microcode[4] = '400'
  global.microcode[5] = '500'
  global.microcode[6] = '600'
  global.microcode[7] = '700'
  global.microcode[8] = '800'
  global.microcode[9] = '900'
  global.microcode[10] = 'A00'

  gui.refresh()

  for (var i = 0; i < 12; i++) {
    CU.doUInstruction()
  }
})
