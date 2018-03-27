var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')
var clock = require('./clock.js')
var alu = require('./alu.js')
var uComp = require('./microcodeCompiler.js')
var mComp = require('./memoryCompiler.js')

$(document).ready(function () {
  document.getElementById('file').style.display = 'none'

  window.global = global
  window.LS = LS
  window.gui = gui
  window.CU = CU
  window.clock = clock
  window.alu = alu
  window.uComp = uComp
  window.mComp = mComp

  LS.initGlobals()

  gui.DrawMemoryTable()
  gui.DrawMemoryEditor()
  gui.DrawMicrocodeTable()
  gui.DrawMicrocodeEditor()
  gui.onclickSetup()
  gui.onChangeSetup()
  gui.refresh()

  document.getElementById('compileMicrocode').onclick()
  document.getElementById('compileMemory').onclick()
  document.getElementById('rst-btn').onclick()

  global.advanced = false

})


window.onbeforeunload = function () {
  LS.storeGlobals()
}
