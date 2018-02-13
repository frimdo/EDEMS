var $ = require('jquery')
var global = require('../globals.js')
var gui = {}

gui.refresh = function () {
  $('#registerF').text('0x' + global.registerF.hex)
  $('#registerA').text('0x' + global.registerA.hex)
  $('#registerB').text('0x' + global.registerB.hex)
  $('#registerC').text('0x' + global.registerC.hex)
  $('#registerD').text('0x' + global.registerD.hex)
  $('#registerE').text('0x' + global.registerE.hex)
  $('#registerS').text('0x' + global.registerS.hex)
  $('#registerP').text('0x' + global.registerP.hex)
  $('#registerPCH').text('0x' + global.registerPCH.hex)
  $('#registerPCL').text('0x' + global.registerPCL.hex)
  $('#registerTMP0').text('0x' + global.registerTMP0.hex)
  $('#registerOP').text('0x' + global.registerOP.hex)
  $('#registerTMP1').text('0x' + global.registerTMP1.hex)
  $('#registerTMP2').text('0x' + global.registerTMP2.hex)
  $('#registerUPCH').text('0x' + global.registerUPCH.hex)
  $('#registerUPCL').text('0x' + global.registerUPCL.hex)


  for (var i = 0; i < global.microcode.length; i++) {
    $('#microcode' + i).text(global.microcode[i])
  }

  for (var i = 0; i < global.memory.length; i++) {
    $('#memory' + i).text(global.to1Bhex(global.memory[i]))
  }
  console.log('microcode' + global.registerPCH.decPair)
  document.getElementById('microcode' + global.registerPCH.decPair).style.backgroundColor = '#808080'
}

gui.drawMicrocode = function () {
  $('#microcode').append('<table>')
  $('#microcode').append('<caption>Micromemory</caption>')
  $('#microcode').append('<tr>')

  for (var i = 0; i < global.microcode.length; i++) {
    if (i % 8 === 0) {
      $('#microcode').append('</tr>').append('<tr>')
    }
    $('#microcode').append('<th><div id=microcode'+ i + '>Placeholder</div></th>')
  }
}

gui.drawMemory = function () {
  $('#memory').append('<table>')
  $('#memory').append('<caption>Memory</caption>')
  $('#memory').append('<tr>')

  for (var i = 0; i < global.memory.length; i++) {
    if (i % 8 === 0) {
      $('#memory').append('</tr>').append('<tr>')
    }
    $('#memory').append('<th><div id=memory'+ i + '>Placeholder</div></th>')
  }
}

module.exports = gui
