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
  document.getElementById('import').style.display = 'none'
  document.getElementById('export').style.display = 'none'

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
  gui.DrawMemoryDebug()

  gui.DrawMicrocodeTable()
  gui.DrawMicrocodeEditor()
  gui.DrawMicrocodeDebug()

  gui.onclickSetup()
  gui.onChangeSetup()
  gui.refresh()

  document.getElementById('memorySource').onclick()
  document.getElementById('microcodeSource').onclick()
  document.getElementById('selectEdemsType').onchange()
  document.getElementById('compileMicrocode').onclick()
  document.getElementById('compileMemory').onclick()
  document.getElementById('rst-btn').onclick()

})

window.onbeforeunload = function () {
  LS.storeGlobals()
}
