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

  window.global=global
  window.LS=LS
  window.gui=gui
  window.CU=CU
  window.clock=clock
  window.alu=alu

  LS.initGlobals()
  gui.refresh()
  onclickSetup()
  onChangeSetup()


  $('#microcode0').text(global.microcode[0] = '601')
  $('#microcode1').text(global.microcode[1] = '501')
  $('#microcode2').text(global.microcode[2] = '79A')
  $('#microcode3').text(global.microcode[3] = '503')
  $('#microcode4').text(global.microcode[4] = '001')
  $('#microcode5').text(global.microcode[5] = '797')
  $('#microcode6').text(global.microcode[6] = '804')


})

function onclickSetup(){

  document.getElementById('decr').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.includes('F-pair')) {
      CU.uinstr.decw('7')
      return
    }
    if (array.includes('B-pair')) {
      CU.uinstr.decw('0')
      return
    }
    if (array.includes('D-pair')) {
      CU.uinstr.decw('1')
      return
    }
    if (array.includes('S-pair')) {
      CU.uinstr.decw('2')
      return
    }
    if (array.includes('PCH-pair')) {
      CU.uinstr.decw('8')
      return
    }
    if (array.includes('TMP0-pair')) {
      CU.uinstr.decw('A')
      return
    }
    if (array.includes('TMP1-pair')) {
      CU.uinstr.decw('B')
      return
    }
    if (array.includes('UPCH-pair')) {
      CU.uinstr.decw('C')
      return
    }
    if (array.includes('A-button')) {
      CU.uinstr.decb('6')
      return
    }
    if (array.includes('F-button')) {
      CU.uinstr.decb('7')
      return
    }
    if (array.includes('C-button')) {
      CU.uinstr.decb('3')
      return
    }
    if (array.includes('B-button')) {
      CU.uinstr.decb('0')
      return
    }
    if (array.includes('E-button')) {
      CU.uinstr.decb('4')
      return
    }
    if (array.includes('D-button')) {
      CU.uinstr.decb('1')
      return
    }
    if (array.includes('P-button')) {
      CU.uinstr.decb('5')
      return
    }
    if (array.includes('S-button')) {
      CU.uinstr.decb('2')
      return
    }
    if (array.includes('PCL-button')) {
      CU.uinstr.decb('9')
      return
    }
    if (array.includes('PCH-button')) {
      CU.uinstr.decb('8')
      return
    }
    if (array.includes('OP-button')) {
      CU.uinstr.decb('D')
      return
    }
    if (array.includes('TMP0-button')) {
      CU.uinstr.decb('A')
      return
    }
    if (array.includes('TMP2-button')) {
      CU.uinstr.decb('E')
      return
    }
    if (array.includes('TMP1-button')) {
      CU.uinstr.decb('B')
      return
    }
    if (array.includes('UPCL-button')) {
      CU.uinstr.decb('F')
      return
    }
    if (array.includes('UPCH-button')) {
      CU.uinstr.decb('C')
      return
    }
  }

  document.getElementById('incr').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.includes('F-pair')) {
      CU.uinstr.incw('7')
      return
    }
    if (array.includes('B-pair')) {
      CU.uinstr.incw('0')
      return
    }
    if (array.includes('D-pair')) {
      CU.uinstr.incw('1')
      return
    }
    if (array.includes('S-pair')) {
      CU.uinstr.incw('2')
      return
    }
    if (array.includes('PCH-pair')) {
      CU.uinstr.incw('8')
      return
    }
    if (array.includes('TMP0-pair')) {
      CU.uinstr.incw('A')
      return
    }
    if (array.includes('TMP1-pair')) {
      CU.uinstr.incw('B')
      return
    }
    if (array.includes('UPCH-pair')) {
      CU.uinstr.incw('C')
      return
    }
    if (array.includes('A-button')) {
      CU.uinstr.incb('6')
      return
    }
    if (array.includes('F-button')) {
      CU.uinstr.incb('7')
      return
    }
    if (array.includes('C-button')) {
      CU.uinstr.incb('3')
      return
    }
    if (array.includes('B-button')) {
      CU.uinstr.incb('0')
      return
    }
    if (array.includes('E-button')) {
      CU.uinstr.incb('4')
      return
    }
    if (array.includes('D-button')) {
      CU.uinstr.incb('1')
      return
    }
    if (array.includes('P-button')) {
      CU.uinstr.incb('5')
      return
    }
    if (array.includes('S-button')) {
      CU.uinstr.incb('2')
      return
    }
    if (array.includes('PCL-button')) {
      CU.uinstr.incb('9')
      return
    }
    if (array.includes('PCH-button')) {
      CU.uinstr.incb('8')
      return
    }
    if (array.includes('OP-button')) {
      CU.uinstr.incb('D')
      return
    }
    if (array.includes('TMP0-button')) {
      CU.uinstr.incb('A')
      return
    }
    if (array.includes('TMP2-button')) {
      CU.uinstr.incb('E')
      return
    }
    if (array.includes('TMP1-button')) {
      CU.uinstr.incb('B')
      return
    }
    if (array.includes('UPCL-button')) {
      CU.uinstr.incb('F')
      return
    }
    if (array.includes('UPCH-button')) {
      CU.uinstr.incb('C')
      return
    }
  }

  document.getElementById('D2R').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if(array.join('-').split('-').includes('pair')){
      return
    }
  if(array.includes('A-button')){
      CU.uinstr.db2r('6')
    return
    }
  if(array.includes('F-button')){
      CU.uinstr.db2r('7')
    return
    }
  if(array.includes('C-button')){
      CU.uinstr.db2r('3')
    return
    }
  if(array.includes('B-button')){
      CU.uinstr.db2r('0')
    return
    }
  if(array.includes('E-button')){
      CU.uinstr.db2r('4')
    return
    }
  if(array.includes('D-button')){
      CU.uinstr.db2r('1')
    return
    }
  if(array.includes('P-button')){
      CU.uinstr.db2r('5')
    return
    }
  if(array.includes('S-button')){
      CU.uinstr.db2r('2')
    return
    }
  if(array.includes('PCL-button')){
      CU.uinstr.db2r('9')
    return
    }
  if(array.includes('PCH-button')){
      CU.uinstr.db2r('8')
    return
    }
  if(array.includes('OP-button')){
      CU.uinstr.db2r('D')
    return
    }
  if(array.includes('TMP0-button')){
      CU.uinstr.db2r('A')
    return
    }
  if(array.includes('TMP2-button')){
      CU.uinstr.db2r('E')
    return
    }
  if(array.includes('TMP1-button')){
      CU.uinstr.db2r('B')
    return
    }
  if(array.includes('UPCL-button')){
      CU.uinstr.db2r('F')
    return
    }
  if(array.includes('UPCH-button')){
      CU.uinstr.db2r('C')
    return
    }
  }

  document.getElementById('R2D').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if(array.join('-').split('-').includes('pair')){
      return
    }
    if(array.includes('A-button')){
      CU.uinstr.r2db('6')
      return
    }
    if(array.includes('F-button')){
      CU.uinstr.r2db('7')
      return
    }
    if(array.includes('C-button')){
      CU.uinstr.r2db('3')
      return
    }
    if(array.includes('B-button')){
      CU.uinstr.r2db('0')
      return
    }
    if(array.includes('E-button')){
      CU.uinstr.r2db('4')
      return
    }
    if(array.includes('D-button')){
      CU.uinstr.r2db('1')
      return
    }
    if(array.includes('P-button')){
      CU.uinstr.r2db('5')
      return
    }
    if(array.includes('S-button')){
      CU.uinstr.r2db('2')
      return
    }
    if(array.includes('PCL-button')){
      CU.uinstr.r2db('9')
      return
    }
    if(array.includes('PCH-button')){
      CU.uinstr.r2db('8')
      return
    }
    if(array.includes('OP-button')){
      CU.uinstr.r2db('D')
      return
    }
    if(array.includes('TMP0-button')){
      CU.uinstr.r2db('A')
      return
    }
    if(array.includes('TMP2-button')){
      CU.uinstr.r2db('E')
      return
    }
    if(array.includes('TMP1-button')){
      CU.uinstr.r2db('B')
      return
    }
    if(array.includes('UPCL-button')){
      CU.uinstr.r2db('F')
      return
    }
    if(array.includes('UPCH-button')){
      CU.uinstr.r2db('C')
      return
    }

  }

  document.getElementById('W2A').onclick = function (){
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for(var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if(array.includes('F-pair')){
      CU.uinstr.ab2w('7')
      return
    }
    if(array.includes('B-pair')){
      CU.uinstr.ab2w('0')
      return
    }
    if(array.includes('D-pair')){
      CU.uinstr.ab2w('1')
      return
    }
    if(array.includes('S-pair')){
      CU.uinstr.ab2w('2')
      return
    }
    if(array.includes('PCH-pair')){
      CU.uinstr.ab2w('8')
      return
    }
    if(array.includes('TMP0-pair')){
      CU.uinstr.ab2w('A')
      return
    }
    if(array.includes('TMP1-pair')){
      CU.uinstr.ab2w('B')
      return
    }
    if(array.includes('UPCH-pair')){
      CU.uinstr.ab2w('C')
      return
    }
    }

  document.getElementById('A2W').onclick = function (){
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for(var i = 0; i < elements.length; i++){
      array.push(elements[i].id)
    }
    if(array.includes('F-pair')){
      CU.uinstr.w2ab('7')
      return
    }
    if(array.includes('B-pair')){
      CU.uinstr.w2ab('0')
      return
    }
    if(array.includes('D-pair')){
      CU.uinstr.w2ab('1')
      return
    }
    if(array.includes('S-pair')){
      CU.uinstr.w2ab('2')
      return
    }
    if(array.includes('PCH-pair')){
      CU.uinstr.w2ab('8')
      return
    }
    if(array.includes('TMP0-pair')){
      CU.uinstr.w2ab('A')
      return
    }
    if(array.includes('TMP1-pair')){
      CU.uinstr.w2ab('B')
      return
    }
    if(array.includes('UPCH-pair')){
      CU.uinstr.w2ab('C')
      return
    }
    if(array.includes('A-button')){
      CU.uinstr.r2ab('6')
      return
    }
    if(array.includes('F-button')){
      CU.uinstr.r2ab('7')
      return
    }
    if(array.includes('C-button')){
      CU.uinstr.r2ab('3')
      return
    }
    if(array.includes('B-button')){
      CU.uinstr.r2ab('0')
      return
    }
    if(array.includes('E-button')){
      CU.uinstr.r2ab('4')
      return
    }
    if(array.includes('D-button')){
      CU.uinstr.r2ab('1')
      return
    }
    if(array.includes('P-button')){
      CU.uinstr.r2ab('5')
      return
    }
    if(array.includes('S-button')){
      CU.uinstr.r2ab('2')
      return
    }
    if(array.includes('PCL-button')){
      CU.uinstr.r2ab('9')
      return
    }
    if(array.includes('PCH-button')){
      CU.uinstr.r2ab('8')
      return
    }
    if(array.includes('OP-button')){
      CU.uinstr.r2ab('D')
      return
    }
    if(array.includes('TMP0-button')){
      CU.uinstr.r2ab('A')
      return
    }
    if(array.includes('TMP2-button')){
      CU.uinstr.r2ab('E')
      return
    }
    if(array.includes('TMP1-button')){
      CU.uinstr.r2ab('B')
      return
    }
    if(array.includes('UPCL-button')){
      CU.uinstr.r2ab('F')
      return
    }
    if(array.includes('UPCH-button')){
      CU.uinstr.r2ab('C')
      return
    }

  }

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
    $('#F-button').addClass('selectedRegister')
    $('#A-button').addClass('selectedRegister')
  }

  document.getElementById('B-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#B-pair').addClass('selectedRegister')
    $('#B-button').addClass('selectedRegister')
    $('#C-button').addClass('selectedRegister')
  }

  document.getElementById('D-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#D-pair').addClass('selectedRegister')
    $('#D-button').addClass('selectedRegister')
    $('#E-button').addClass('selectedRegister')
  }

  document.getElementById('S-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#S-pair').addClass('selectedRegister')
    $('#S-button').addClass('selectedRegister')
    $('#P-button').addClass('selectedRegister')
  }

  document.getElementById('PCH-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#PCH-pair').addClass('selectedRegister')
    $('#PCH-button').addClass('selectedRegister')
    $('#PCL-button').addClass('selectedRegister')
  }

  document.getElementById('TMP0-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP0-pair').addClass('selectedRegister')
    $('#TMP0-button').addClass('selectedRegister')
    $('#OP-button').addClass('selectedRegister')
  }

  document.getElementById('TMP1-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#TMP1-pair').addClass('selectedRegister')
    $('#TMP1-button').addClass('selectedRegister')
    $('#TMP2-button').addClass('selectedRegister')
  }

  document.getElementById('UPCH-pair').onclick = function (){
    $('#registers-grid').find('button').removeClass('selectedRegister')
    $('#UPCH-pair').addClass('selectedRegister')
    $('#UPCH-button').addClass('selectedRegister')
    $('#UPCL-button').addClass('selectedRegister')
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
}

function onChangeSetup(){
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
    document.getElementById('IdataBus').value = '0x' + global.dataBus.hex
    $('#IdataBus').addClass('highlighted')
    setTimeout(function () {
      $('#IdataBus').removeClass('highlighted')
    }, 500)
  }

  document.getElementById('IdataBus').onchange = function () {
    var tmp = document.getElementById('IdataBus').value
    if (tmp.length == 4 || tmp.length == 2) {
      if (tmp.length == 2) {
        tmp = '0x' + tmp
      }
      try{
        global.dataBus.val = tmp
      } catch(x){
        console.log(x)
        global.dataBus.val = global.dataBus.dec
      }
      return
    }

    $('#EdataBus').addClass('failed')
    setTimeout(function () {
      $('#EdataBus').removeClass('failed')
    }, 500)
    $('#IdataBus').addClass('failed')
    setTimeout(function () {
      document.getElementById('IdataBus').value = '0x' + global.dataBus.hex
      $('#IdataBus').removeClass('failed')
    }, 500)
  }

  global.instructionRegister.onChange = function () {
    $('#instructionRegister').text('0x' + global.instructionRegister.hex).addClass('highlighted')
    setTimeout(function () {
      $('#instructionRegister').removeClass('highlighted')
    }, 500)
  }
}