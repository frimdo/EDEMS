var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')
var clock = require('./clock.js')
var alu = require('./alu.js')

/* document.getElementsByClassName('selectedRegister')[0].id.split('-') */

$(document).ready(function () {
  document.getElementById('file').style.display = 'none'
  window.clock = clock

  LS.initGlobals()
  gui.refresh()

  $('#microcode0').text(global.microcode[0] = '601')
  $('#microcode1').text(global.microcode[1] = '501')
  $('#microcode2').text(global.microcode[2] = '79A')
  $('#microcode3').text(global.microcode[3] = '503')
  $('#microcode4').text(global.microcode[4] = '001')
  $('#microcode5').text(global.microcode[5] = '804')

  document.getElementById('F-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#F-button').addClass('selectedRegister')
  }

  document.getElementById('A-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#A-button').addClass('selectedRegister')
  }

  document.getElementById('B-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#B-button').addClass('selectedRegister')
  }

  document.getElementById('C-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#C-button').addClass('selectedRegister')
  }

  document.getElementById('D-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#D-button').addClass('selectedRegister')
  }

  document.getElementById('E-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#E-button').addClass('selectedRegister')
  }

  document.getElementById('S-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#S-button').addClass('selectedRegister')
  }

  document.getElementById('P-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#P-button').addClass('selectedRegister')
  }

  document.getElementById('PCH-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#PCH-button').addClass('selectedRegister')
  }

  document.getElementById('PCL-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#PCL-button').addClass('selectedRegister')
  }

  document.getElementById('TMP0-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP0-button').addClass('selectedRegister')
  }

  document.getElementById('OP-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#OP-button').addClass('selectedRegister')
  }

  document.getElementById('TMP1-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP1-button').addClass('selectedRegister')
  }

  document.getElementById('TMP2-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP2-button').addClass('selectedRegister')
  }

  document.getElementById('UPCH-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#UPCH-button').addClass('selectedRegister')
  }

  document.getElementById('UPCL-button').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#UPCL-button').addClass('selectedRegister')
  }


  document.getElementById('F-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#F-pair').addClass('selectedRegister')
  }

  document.getElementById('B-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#B-pair').addClass('selectedRegister')
  }

  document.getElementById('D-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#D-pair').addClass('selectedRegister')
  }

  document.getElementById('S-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#S-pair').addClass('selectedRegister')
  }

  document.getElementById('PCH-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#PCH-pair').addClass('selectedRegister')
  }

  document.getElementById('TMP0-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP0-pair').addClass('selectedRegister')
  }

  document.getElementById('TMP1-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP1-pair').addClass('selectedRegister')
  }

  document.getElementById('UPCH-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#UPCH-pair').addClass('selectedRegister')
  }



  document.getElementById('ustep-btn').onclick = function () {
    clock.ustep()
  }

  document.getElementById('urun-btn').onclick = function () {
    clock.urun()
  }

  document.getElementById('stop-btn').onclick = function () {
    clock.stop()
  }

  document.getElementById('WRT').onclick = function () {
    CU.uinstr.wrt()
  }

  document.getElementById('REA').onclick = function () {
    CU.uinstr.read()
  }

  document.getElementById('AL2').onclick = function () {
    alu.doOperation(document.getElementById('aluSelect').selectedIndex + 1)
  }

  document.getElementById('freq').onchange = function () {
    var tmp = document.getElementById('freq').value
    if (tmp < 1) {
      tmp = 1
    }
    if (tmp > 500) {
      tmp = 500
    }
    global.freq = tmp
    document.getElementById('freq').value = tmp
  }

  global.registerA.onChange = function () {
    $('#registerA').text('0x' + global.registerA.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerA').removeClass('highlighted')
    }, 500)
  }

  global.registerF.onChange = function () {
    $('#registerF').text('0x' + global.registerF.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerF').removeClass('highlighted')
    }, 500)
  }

  global.registerC.onChange = function () {
    $('#registerC').text('0x' + global.registerC.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerC').removeClass('highlighted')
    }, 500)
  }

  global.registerB.onChange = function () {
    $('#registerB').text('0x' + global.registerB.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerB').removeClass('highlighted')
    }, 500)
  }

  global.registerE.onChange = function () {
    $('#registerE').text('0x' + global.registerE.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerE').removeClass('highlighted')
    }, 500)
  }

  global.registerD.onChange = function () {
    $('#registerD').text('0x' + global.registerD.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerD').removeClass('highlighted')
    }, 500)
  }

  global.registerP.onChange = function () {
    $('#registerP').text('0x' + global.registerP.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerP').removeClass('highlighted')
    }, 500)
  }

  global.registerS.onChange = function () {
    $('#registerS').text('0x' + global.registerS.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerS').removeClass('highlighted')
    }, 500)
  }

  global.registerPCL.onChange = function () {
    $('#registerPCL').text('0x' + global.registerPCL.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerPCL').removeClass('highlighted')
    }, 500)
  }

  global.registerPCH.onChange = function () {
    $('#registerPCH').text('0x' + global.registerPCH.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerPCH').removeClass('highlighted')
    }, 500)
  }

  global.registerOP.onChange = function () {
    $('#registerOP').text('0x' + global.registerOP.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerOP').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP0.onChange = function () {
    $('#registerTMP0').text('0x' + global.registerTMP0.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP0').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP2.onChange = function () {
    $('#registerTMP2').text('0x' + global.registerTMP2.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP2').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP1.onChange = function () {
    $('#registerTMP1').text('0x' + global.registerTMP1.hex).addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP1').removeClass('highlighted')
    }, 500)
  }

  global.registerUPCL.onChange = function () {
    $('#registerUPCL').text('0x' + global.registerUPCL.hex).addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
    setTimeout(function () {
      $('#registerUPCL').removeClass('highlighted')
    }, 500)
  }

  global.registerUPCH.onChange = function () {
    $('#registerUPCH').text('0x' + global.registerUPCH.hex).addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
    setTimeout(function () {
      $('#registerUPCH').removeClass('highlighted')
    }, 500)
  }

  global.addressBus.onChange = function () {
    $('#addressBus').text('0x' + global.addressBus.hex).addClass('highlighted')
    setTimeout(function () {
      $('#addressBus').removeClass('highlighted')
    }, 500)
  }

  global.dataBus.onChange = function () {
    $('#EdataBus').text('0x' + global.dataBus.hex).addClass('highlighted')
    setTimeout(function () {
      $('#EdataBus').removeClass('highlighted')
    }, 500)
    $('#IdataBus').text('0x' + global.dataBus.hex).addClass('highlighted')
    setTimeout(function () {
      $('#IdataBus').removeClass('highlighted')
    }, 500)
  }

  global.instructionRegister.onChange = function () {
    $('#instructionRegister').text('0x' + global.instructionRegister.hex).addClass('highlighted')
    setTimeout(function () {
      $('#instructionRegister').removeClass('highlighted')
    }, 500)
  }

})


function onclickSetup(){

}

function onChangeSetup(){

}