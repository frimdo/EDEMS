var $ = require('jquery')
var sim = require('./simulator.js')
var gui = require('./gui.js')
var BinNumber = require('./binNumber.js')

$(document).ready(function () {
  sim.variableInit()
  gui.drawMicrocode()
})

var L = new BinNumber(253)
var H = new BinNumber(7, 3, L)


H.valPair = 258
console.log(H.hexPair)
H.valPair = '0x2FF'
console.log(H.hexPair)
H.valPair = '0x1AA'
console.log(H.hexPair)
