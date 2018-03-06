var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')
var clock = require('./clock.js')
var alu = require('./alu.js')
var uComp = require('./microcodeCompiler.js')


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
  document.getElementById('advanced').onclick()




  var input = `COOP 0x12
ALU 
R>DB A
R>AB A
W>AB B
DB>R OP
AB>W TMP1
INCB A
DECB F
INCW F
DECW UPCH
JOI PCL
JON tmp0
JOFI C
JOFN D
C>DB 0x1
SVR E F
SVW S D
O>DB
DB>O
END
JMP 0b101
HLT
READ
WRT
SETB F 2
RETB B 0b101
`

  console.log(uComp.compile(input))
})

window.onbeforeunload = function() {
  LS.storeGlobals()
}