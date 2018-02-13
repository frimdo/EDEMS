var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')


$(document).ready(function () {
  LS.initGlobals()
  gui.drawMicrocode()
  gui.refresh()

  $('#microcode0').text(global.microcode[0] = '0AA')
  $('#microcode1').text(global.microcode[1] = '1AA')
  $('#microcode2').text(global.microcode[2] = '2AA')
  $('#microcode3').text(global.microcode[3] = '3AA')
  $('#microcode4').text(global.microcode[4] = '4AA')
  $('#microcode5').text(global.microcode[5] = '5AA')
  $('#microcode6').text(global.microcode[6] = '6AA')
  $('#microcode7').text(global.microcode[7] = '7AA')
  $('#microcode8').text(global.microcode[8] = '8AA')
  $('#microcode9').text(global.microcode[9] = '9AA')
  $('#microcode10').text(global.microcode[10] = 'AAA')
  $('#microcode11').text(global.microcode[11] = 'BAA')
  $('#microcode12').text(global.microcode[12] = 'CAA')
  $('#microcode13').text(global.microcode[13] = 'DAA')
  $('#microcode14').text(global.microcode[14] = 'EAA')
  $('#microcode15').text(global.microcode[15] = 'FAA')

  document.getElementById('step-btn').onclick = function() {
    CU.doUInstruction(function(){
      $('.umem-highlighted').removeClass('umem-highlighted')
      $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
    })
  }

  global.registerA.onChange = function(){
    $('#registerA').text('0x' + global.registerA.hex)
    $('#registerA').addClass('highlighted');
    setTimeout(function () {
      $('#registerA').removeClass('highlighted');
    }, 500);
  }

  global.registerF.onChange = function(){
    $('#registerF').text('0x' + global.registerF.hex)
    $('#registerF').addClass('highlighted');
    setTimeout(function () {
      $('#registerF').removeClass('highlighted');
    }, 500);
  }

  global.registerC.onChange = function(){
    $('#registerC').text('0x' + global.registerC.hex)
    $('#registerC').addClass('highlighted');
    setTimeout(function () {
      $('#registerC').removeClass('highlighted');
    }, 500);
  }

  global.registerB.onChange = function(){
    $('#registerB').text('0x' + global.registerB.hex)
    $('#registerB').addClass('highlighted');
    setTimeout(function () {
      $('#registerB').removeClass('highlighted');
    }, 500);
  }

  global.registerE.onChange = function(){
    $('#registerE').text('0x' + global.registerE.hex)
    $('#registerE').addClass('highlighted');
    setTimeout(function () {
      $('#registerE').removeClass('highlighted');
    }, 500);
  }

  global.registerD.onChange = function(){
    $('#registerD').text('0x' + global.registerD.hex)
    $('#registerD').addClass('highlighted');
    setTimeout(function () {
      $('#registerD').removeClass('highlighted');
    }, 500);
  }

  global.registerP.onChange = function(){
    $('#registerP').text('0x' + global.registerP.hex)
    $('#registerP').addClass('highlighted');
    setTimeout(function () {
      $('#registerP').removeClass('highlighted');
    }, 500);
  }

  global.registerS.onChange = function(){
    $('#registerS').text('0x' + global.registerS.hex)
    $('#registerS').addClass('highlighted');
    setTimeout(function () {
      $('#registerS').removeClass('highlighted');
    }, 500);
  }

  global.registerPCL.onChange = function(){
    $('#registerPCL').text('0x' + global.registerPCL.hex)
    $('#registerPCL').addClass('highlighted');
    setTimeout(function () {
      $('#registerPCL').removeClass('highlighted');
    }, 500);
  }

  global.registerPCH.onChange = function(){
    $('#registerPCH').text('0x' + global.registerPCH.hex)
    $('#registerPCH').addClass('highlighted');
    setTimeout(function () {
      $('#registerPCH').removeClass('highlighted');
    }, 500);
  }

  global.registerOP.onChange = function(){
    $('#registerOP').text('0x' + global.registerOP.hex)
    $('#registerOP').addClass('highlighted');
    setTimeout(function () {
      $('#registerOP').removeClass('highlighted');
    }, 500);
  }

  global.registerTMP0.onChange = function(){
    $('#registerTMP0').text('0x' + global.registerTMP0.hex)
    $('#registerTMP0').addClass('highlighted');
    setTimeout(function () {
      $('#registerTMP0').removeClass('highlighted');
    }, 500);
  }

  global.registerTMP2.onChange = function(){
    $('#registerTMP2').text('0x' + global.registerTMP2.hex)
    $('#registerTMP2').addClass('highlighted');
    setTimeout(function () {
      $('#registerTMP2').removeClass('highlighted');
    }, 500);
  }

  global.registerTMP1.onChange = function(){
    $('#registerTMP1').text('0x' + global.registerTMP1.hex)
    $('#registerTMP1').addClass('highlighted');
    setTimeout(function () {
      $('#registerTMP1').removeClass('highlighted');
    }, 500);
  }

  global.registerUPCL.onChange = function(){
    $('#registerUPCL').text('0x' + global.registerUPCL.hex)
    $('#registerUPCL').addClass('highlighted');
    setTimeout(function () {
      $('#registerUPCL').removeClass('highlighted');
    }, 500);
  }

  global.registerUPCH.onChange = function(){
    $('#registerUPCH').text('0x' + global.registerUPCH.hex)
    $('#registerUPCH').addClass('highlighted');
    setTimeout(function () {
      $('#registerUPCH').removeClass('highlighted');
    }, 500);
  }

})
