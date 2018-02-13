var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')

$(document).ready(function () {
  LS.initGlobals()
  gui.drawMicrocode()
  /*gui.drawMemory()*/
  gui.refresh()

  global.microcode[1] = '1AA'
  global.microcode[2] = '6AB'
  global.microcode[3] = '73A'
  global.microcode[4] = '891'

  CU.doUInstruction()
  CU.doUInstruction()
  CU.doUInstruction()
  CU.doUInstruction()
  CU.doUInstruction()
  gui.refresh()
})
