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
  document.getElementById('step-btn').onclick = function() {
    CU.doUInstruction()}
  global.microcode[0] = '1AA'
  global.microcode[1] = '2AA'
  global.microcode[2] = '3AA'
  global.microcode[3] = '4AA'
  global.microcode[4] = '5AA'
  global.microcode[5] = '6AA'
  global.microcode[6] = '7AA'

  // TODO: využít metodu onChange
  global.registerA.onChange = function(from, to){
    console.log(from, to)
  }
  global.registerA.onChange('a je', 'to')

})
