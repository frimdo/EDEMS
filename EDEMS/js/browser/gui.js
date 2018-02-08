var $ = require('jquery')
var global = require('../globals')
var gui = {}

gui.refresh = function () {
  $('.registerF').text('0x' + global.registerF.hex)
  $('.registerA').text('0x' + global.registerA.hex)
  $('.registerB').text('0x' + global.registerB.hex)
  $('.registerC').text('0x' + global.registerC.hex)
  $('.registerD').text('0x' + global.registerD.hex)
  $('.registerE').text('0x' + global.registerE.hex)
  $('.registerS').text('0x' + global.registerS.hex)
  $('.registerP').text('0x' + global.registerP.hex)
  $('.registerPCH').text('0x' + global.registerPCH.hex)
  $('.registerPCL').text('0x' + global.registerPCL.hex)
  $('.registerTMP0').text('0x' + global.registerTMP0.hex)
  $('.registerOP').text('0x' + global.registerOP.hex)
  $('.registerTMP1').text('0x' + global.registerTMP1.hex)
  $('.registerTMP2').text('0x' + global.registerTMP2.hex)
  $('.registerUPCH').text('0x' + global.registerUPCH.hex)
  $('.registerUPCL').text('0x' + global.registerUPCL.hex)
  gui.drawMicrocode()
}

gui.drawMicrocode = function () {
  var ROM = window.localStorage.getItem('microcode').split(',')
  $('#microcode').append('<table>')
  $('#microcode').append('<caption>Micromemory</caption>')
  $('#microcode').append('<tr>')

  for (var i = 0; i < ROM.length; i++) {
    if (i % 8 === 0) {
      $('#microcode').append('</tr>').append('<tr>')
    }
    $('#microcode').append('<th>' + ROM[i] + '</th>')
  }
}

module.exports = gui
