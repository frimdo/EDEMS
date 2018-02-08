var $ = require('jquery')
var sim = require('./simulator.js')
var gui = require('./gui.js')
var BinNumber = require('./binNumber.js')

$(document).ready(function () {
  sim.variableInit()
  gui.drawMicrocode()
})

var L = new BinNumber(253)
var H = new BinNumber(12, 3, L)

H.val = '0xAAA'
console.log(H.hex) // B
H.valPair = 258
console.log(H.hexPair) // 102
H.valPair = 2047 // '0x7FF'
console.log(H.hexPair) // 7FF
H.valPair = 426 // '0x1AA'
console.log(H.hexPair) // 1AA
H.valPair = 2986 // '0xBAA'
console.log(H.hexPair) // 3AA
