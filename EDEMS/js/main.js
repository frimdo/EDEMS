var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')
var clock = require('./clock.js')
var alu = require('./alu.js')
var uComp = require('./microcodeCompiler.js')
var mComp = require('./memoryCompiler.js')

/* document.getElementsByClassName('selectedRegister')[0].id.split('-') */

$(document).ready(function () {
  document.getElementById('file').style.display = 'none'

  window.global = global
  window.LS = LS
  window.gui = gui
  window.CU = CU
  window.clock = clock
  window.alu = alu

  LS.initGlobals()

  $('#microcode0').text(global.microcode[0] = '601')
  $('#microcode1').text(global.microcode[1] = '501')
  $('#microcode2').text(global.microcode[2] = '79A')
  $('#microcode3').text(global.microcode[3] = '503')
  $('#microcode4').text(global.microcode[4] = '001')
  $('#microcode5').text(global.microcode[5] = '796')
  $('#microcode6').text(global.microcode[6] = '804')

  gui.DrawMemoryTable()
  gui.DrawMemoryEditor()
  gui.DrawMicrocodeTable()
  gui.DrawMicrocodeEditor()
  gui.onclickSetup()
  gui.onChangeSetup()
  gui.refresh()

  global.advanced = false
})

/*
window.onbeforeunload = function () {
  LS.storeGlobals()
}
*/