var $ = require('jquery')
var global = require('./globals.js')
var LS = require('./browser/localStorage.js')
var gui = require('./browser/gui.js')
var CU = require('./controlUnit.js')
var BinNumber = require('./binNumber.js')
var clock = require('./clock.js')
var alu = require('./alu.js')

$(document).ready(function () {
  document.getElementById('file').style.display = 'none'
  window.clock = clock

  LS.initGlobals()
  gui.refresh()

  global.instructionRegister = 5

  $('#microcode0').text(global.microcode[0] = '601')
  $('#microcode1').text(global.microcode[1] = '501')
  $('#microcode2').text(global.microcode[2] = '79A')
  $('#microcode3').text(global.microcode[3] = '503')
  $('#microcode4').text(global.microcode[4] = '001')
  $('#microcode5').text(global.microcode[5] = '804')

  document.getElementById('F-button').onclick = function (){
    /*var element = document.getElementById('F-button')
    for(x in document.getElementsByClassName('selected1')){

    }
    if(document.getElementsByClassName('selected1').length >= 1){
      $('#F-button').addClass('selected2')
    } else {
      $('#F-button').addClass('selected1')
    }*/
  }
  document.getElementById('A-button').onclick = function (){
    /*console.log(document.getElementsByClassName('selected1'), document.getElementsByClassName('selected1').length)
    if(document.getElementsByClassName('selected1').length >= 1){
      $('#A-button').addClass('selected2')
    } else {
      $('#A-button').addClass('selected1')
    }*/
  }
  document.getElementById('B-button').onclick = function (){}
  document.getElementById('C-button').onclick = function (){}
  document.getElementById('D-button').onclick = function (){}
  document.getElementById('E-button').onclick = function (){}
  document.getElementById('S-button').onclick = function (){}
  document.getElementById('P-button').onclick = function (){}
  document.getElementById('PCH-button').onclick = function (){}
  document.getElementById('PCL-button').onclick = function (){}
  document.getElementById('TMP0-button').onclick = function (){}
  document.getElementById('OP-button').onclick = function (){}
  document.getElementById('TMP1-button').onclick = function (){}
  document.getElementById('TMP2-button').onclick = function (){}
  document.getElementById('UPCH-button').onclick = function (){}
  document.getElementById('UPCL-button').onclick = function (){}

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
    $('#registerA').text('0x' + global.registerA.hex)
    $('#registerA').addClass('highlighted')
    setTimeout(function () {
      $('#registerA').removeClass('highlighted')
    }, 500)
  }

  global.registerF.onChange = function () {
    $('#registerF').text('0x' + global.registerF.hex)
    $('#registerF').addClass('highlighted')
    setTimeout(function () {
      $('#registerF').removeClass('highlighted')
    }, 500)
  }

  global.registerC.onChange = function () {
    $('#registerC').text('0x' + global.registerC.hex)
    $('#registerC').addClass('highlighted')
    setTimeout(function () {
      $('#registerC').removeClass('highlighted')
    }, 500)
  }

  global.registerB.onChange = function () {
    $('#registerB').text('0x' + global.registerB.hex)
    $('#registerB').addClass('highlighted')
    setTimeout(function () {
      $('#registerB').removeClass('highlighted')
    }, 500)
  }

  global.registerE.onChange = function () {
    $('#registerE').text('0x' + global.registerE.hex)
    $('#registerE').addClass('highlighted')
    setTimeout(function () {
      $('#registerE').removeClass('highlighted')
    }, 500)
  }

  global.registerD.onChange = function () {
    $('#registerD').text('0x' + global.registerD.hex)
    $('#registerD').addClass('highlighted')
    setTimeout(function () {
      $('#registerD').removeClass('highlighted')
    }, 500)
  }

  global.registerP.onChange = function () {
    $('#registerP').text('0x' + global.registerP.hex)
    $('#registerP').addClass('highlighted')
    setTimeout(function () {
      $('#registerP').removeClass('highlighted')
    }, 500)
  }

  global.registerS.onChange = function () {
    $('#registerS').text('0x' + global.registerS.hex)
    $('#registerS').addClass('highlighted')
    setTimeout(function () {
      $('#registerS').removeClass('highlighted')
    }, 500)
  }

  global.registerPCL.onChange = function () {
    $('#registerPCL').text('0x' + global.registerPCL.hex)
    $('#registerPCL').addClass('highlighted')
    setTimeout(function () {
      $('#registerPCL').removeClass('highlighted')
    }, 500)
  }

  global.registerPCH.onChange = function () {
    $('#registerPCH').text('0x' + global.registerPCH.hex)
    $('#registerPCH').addClass('highlighted')
    setTimeout(function () {
      $('#registerPCH').removeClass('highlighted')
    }, 500)
  }

  global.registerOP.onChange = function () {
    $('#registerOP').text('0x' + global.registerOP.hex)
    $('#registerOP').addClass('highlighted')
    setTimeout(function () {
      $('#registerOP').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP0.onChange = function () {
    $('#registerTMP0').text('0x' + global.registerTMP0.hex)
    $('#registerTMP0').addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP0').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP2.onChange = function () {
    $('#registerTMP2').text('0x' + global.registerTMP2.hex)
    $('#registerTMP2').addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP2').removeClass('highlighted')
    }, 500)
  }

  global.registerTMP1.onChange = function () {
    $('#registerTMP1').text('0x' + global.registerTMP1.hex)
    $('#registerTMP1').addClass('highlighted')
    setTimeout(function () {
      $('#registerTMP1').removeClass('highlighted')
    }, 500)
  }

  global.registerUPCL.onChange = function () {
    $('#registerUPCL').text('0x' + global.registerUPCL.hex)
    $('#registerUPCL').addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
    setTimeout(function () {
      $('#registerUPCL').removeClass('highlighted')
    }, 500)
  }

  global.registerUPCH.onChange = function () {
    $('#registerUPCH').text('0x' + global.registerUPCH.hex)
    $('#registerUPCH').addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
    setTimeout(function () {
      $('#registerUPCH').removeClass('highlighted')
    }, 500)
  }

  global.addressBus.onChange = function () {
    $('#addressBus').text('0x' + global.addressBus.hex)
    $('#addressBus').addClass('highlighted')
    setTimeout(function () {
      $('#addressBus').removeClass('highlighted')
    }, 500)
  }

  global.dataBus.onChange = function () {
    $('#EdataBus').text('0x' + global.dataBus.hex)
    $('#EdataBus').addClass('highlighted')
    setTimeout(function () {
      $('#EdataBus').removeClass('highlighted')
    }, 500)
    $('#IdataBus').text('0x' + global.dataBus.hex)
    $('#IdataBus').addClass('highlighted')
    setTimeout(function () {
      $('#IdataBus').removeClass('highlighted')
    }, 500)
  }

  global.instructionRegister.onChange = function () {
    $('#instructionRegister').text('0x' + global.instructionRegister.hex)
    $('#instructionRegister').addClass('highlighted')
    setTimeout(function () {
      $('#instructionRegister').removeClass('highlighted')
    }, 500)
  }

})
