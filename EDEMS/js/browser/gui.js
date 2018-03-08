var $ = require('jquery')
var global = require('../globals.js')
var Clusterize = require('clusterize.js')
var uCompiler = require('../microcodeCompiler.js')
var ace = require('brace')
require('brace/mode/assembly_x86')
require('../ace/EdemsMicrocodeAssembly')
require('brace/theme/solarized_dark')
require('brace/theme/solarized_dark')
//var ace = require('../../node_modules/ace-builds/src-min-noconflict/ace.js')

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
  $('#EdataBus').text('0x' + global.dataBus.hex)
  document.getElementById('IdataBus').value = '0x' + global.dataBus.hex
  $('#addressBus').text('0x' + global.addressBus.hex)
  $('#instructionRegister').text('0x' + global.instructionRegister.hex)
  document.getElementById("freq").value = global.freq
}

gui.DrawMemoryTable = function () {

  gui.memoryData = []

  // Creating x-offset row
  var newline = '<tr><th><div class="memory-table-descr">0x</div></th>'
  for (var i = 0; i < 8; i++) {
    newline = newline + '<th><div id=x-offset-memory' + i + ' class="memory-table-descr">0' + i + '</div></th>'
  }
  gui.memoryData.push(newline + '</tr>')

  // Creating other rows
    for (i = 0; i < (global.memory.length); i += 8) {
    newline = '<th><div id=y-offset-memory' + i + ' class="memory-table-descr">'+i.toString(16)+'</div></th>'
    for (var y = 0; y < 8; y++) {
      newline = newline + '<th><div id=memory' + (i + y) + ' class="memoryBlock">...</div></th>'
    }
    gui.memoryData.push(newline + '</tr>')
  }



  gui.MemoryTable = new Clusterize({
    rows: gui.memoryData,
    scrollId: 'scrollArea-memory',
    contentId: 'contentArea-memory',
    rows_in_block: 8,
    callbacks: {
      clusterChanged: function() {
        var value
        var elements = document.getElementsByClassName('memoryBlock')
        for (var i = 0; i < elements.length; i++) {
          value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
          elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
        }
        $('.mem-highlighted').removeClass('mem-highlighted')
        $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
      }
    }
  })

  gui.MemoryTable.refresh(gui.memoryData)
}

gui.DrawMemoryEditor = function () {
  global.memoryEditor = ace.edit('memory-editor');
  global.memoryEditor.getSession().setMode('ace/mode/assembly_x86');
  global.memoryEditor.setTheme('ace/theme/solarized_dark');
}

gui.DrawMicrocodeEditor = function () {
  global.microcodeEditor = ace.edit('microcode-editor');
  global.microcodeEditor.getSession().setMode('ace/mode/EdemsMicrocodeAssembly');
  global.microcodeEditor.setTheme('ace/theme/solarized_dark');
}

gui.DrawMicrocodeTable = function () {

  gui.microcodeData = []

  // Creating x-offset row
  var newline = '<tr><th><div class="microcode-table-descr">0x</div></th>'
  for (var i = 0; i < 8; i++) {
    newline = newline + '<th><div id=x-offset-microcode' + i + ' class="microcode-table-descr">0' + i + '</div></th>'
  }
  gui.microcodeData.push(newline + '</tr>')

  // Creating other rows
  for (i = 0; i < (global.microcode.length); i += 8) {
    newline = '<th><div id=y-offset-microcode' + i + ' class="microcode-table-descr">'+i.toString(16)+'</div></th>'
    for (var y = 0; y < 8; y++) {
      newline = newline + '<th><div id=microcode' + (i + y) + ' class="microcodeBlock">...</div></th>'
    }
    gui.microcodeData.push(newline + '</tr>')
  }

  gui.MemoryTable = new Clusterize({
    rows: gui.microcodeData,
    scrollId: 'scrollArea-microcode',
    contentId: 'contentArea-microcode',
    rows_in_block: 8,
    callbacks: {
      clusterChanged: function () {
        var elements = document.getElementsByClassName('microcodeBlock')
        for (var i = 0; i < elements.length; i++) {
          elements.item(i).innerHTML = global.microcode[+elements.item(i).id.replace('microcode', '')]
        }
        $('.umem-highlighted').removeClass('umem-highlighted')
        $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
      }
    }
  })

  gui.MemoryTable.refresh(gui.microcodeData)
}

gui.onclickSetup = function () {
  document.getElementById('compileMicrocode').onclick = function () {
    try {
      var code = uCompiler.compile(global.microcodeEditor.getValue())
    } catch(Error) {
      alert(Error)
    }
    console.log(code)
    Array.prototype.splice.apply(global.microcode, [0, code.length].concat(code))
    global.onMicrocodeChange()
  }

  document.getElementById('decr').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      CU.uinstr.decb(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.decw(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('incr').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      CU.uinstr.incb(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.incw(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('D2R').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      CU.uinstr.db2o()
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      CU.uinstr.db2r(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    return
  }

  document.getElementById('R2D').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      CU.uinstr.o2db()
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      CU.uinstr.r2db(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    return
  }

  document.getElementById('W2A').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      CU.uinstr.r2ab(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.w2ab(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('A2W').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined){
      return
    }
    CU.uinstr.ab2w(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('svr').onclick = function () {
    if(document.getElementsByClassName('OPSelected')[0] !== undefined){
      return
    }
    var svr = $('#svr')
    if (svr.hasClass('svrSelected')) {
      svr.removeClass('svrSelected')
    } else {
      svr.addClass('svrSelected')
    }
  }

  document.getElementById('OP-button').onclick = function () {
    if (!$('#svr').hasClass('svrSelected')) { // SVR button not pressed
      if ($(this).hasClass('selectedRegister')){
        $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
        $(this).addClass('OPSelected')
        return
      } else if ($(this).hasClass('OPSelected')){
        $(this).removeClass('OPSelected').addClass('selectedRegister')
      }
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
      $(this).addClass('selectedRegister')
    } else {                                 // SVR button pressed
      var pair = document.getElementsByClassName('selectedPair')[0]
      if (pair !== undefined) {
        return
      } else {
        CU.uinstr.svr(
          global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]),
          global.register(this.id.split('-')[0])
        )
      }
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
      $('#svr').removeClass('svrSelected')
      $(this).addClass('selectedRegister')
    }
  }

  document.getElementById('F-button').onclick =
  document.getElementById('A-button').onclick =
  document.getElementById('B-button').onclick =
  document.getElementById('C-button').onclick =
  document.getElementById('D-button').onclick =
  document.getElementById('E-button').onclick =
  document.getElementById('S-button').onclick =
  document.getElementById('P-button').onclick =
  document.getElementById('PCH-button').onclick =
  document.getElementById('PCL-button').onclick =
  document.getElementById('TMP0-button').onclick =
  document.getElementById('TMP1-button').onclick =
  document.getElementById('TMP2-button').onclick =
  document.getElementById('UPCH-button').onclick =
  document.getElementById('UPCL-button').onclick = function () {
    if (!$('#svr').hasClass('svrSelected')) { // SVR button not pressed
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair').removeClass('OPSelected')
      $(this).addClass('selectedRegister')
   } else {                                 // SVR button pressed
      var pair = document.getElementsByClassName('selectedPair')[0]
      if (pair !== undefined) {
        return
      } else {
        CU.uinstr.svr(
          global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]),
          global.register(this.id.split('-')[0])
        )
      }
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
      $('#svr').removeClass('svrSelected')
      $(this).addClass('selectedRegister')
    }
  }


  document.getElementById('F-pair').onclick =
  document.getElementById('B-pair').onclick =
  document.getElementById('D-pair').onclick =
  document.getElementById('S-pair').onclick =
  document.getElementById('PCH-pair').onclick =
  document.getElementById('TMP0-pair').onclick =
  document.getElementById('TMP1-pair').onclick =
  document.getElementById('UPCH-pair').onclick = function () {
    if (!$('#svr').hasClass('svrSelected')) { // SVR button not pressed
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair').removeClass('OPSelected')
      $(this).addClass('selectedPair')
      $(this).siblings().addClass('selectedRegister')
   } else {                                 // SVR button pressed
      var pair = document.getElementsByClassName('selectedPair')[0]
      if (pair === undefined) {
        return
      } else {
        CU.uinstr.svw(
          global.register(document.getElementsByClassName('selectedPair')[0].id.split('-')[0]),
          global.register(this.id.split('-')[0])
        )
        $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
        $('#svr').removeClass('svrSelected')
        $(this).addClass('selectedPair')
        $(this).siblings().addClass('selectedRegister')
      }
    }
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

gui.onChangeSetup = function () {
  document.getElementById('selectEdemsType').onchange = function () {
    global.advanced = this.value
    if(global.advanced == 'advanced'){
      $('#logo span').html('advanced')
      $('#body-grid').addClass('advanced')

      $('#TMP0-pair').removeClass('hidden')
      $('#TMP1-pair').removeClass('hidden')
      $('#UPCH-pair').removeClass('hidden')
      $('#TMP0-button').removeClass('hidden')
      $('#OP-button').removeClass('hidden')
      $('#TMP1-button').removeClass('hidden')
      $('#TMP2-button').removeClass('hidden')
      $('#UPCH-button').removeClass('hidden')
      $('#UPCL-button').removeClass('hidden')

      $('#PCH-pair').prop('disabled', false)
      $('#PCH-button').prop('disabled', false)
      $('#PCL-button').prop('disabled', false)

      $('#controlUnit-grid').removeClass('hidden')
      $('#C2D').removeClass('hidden')
      $('#M2C').removeClass('hidden')
    } else if(global.advanced == 'basic') {
      $('#logo span').html('basic')
      $('#body-grid').removeClass('advanced')

      $('#TMP0-pair').addClass('hidden')
      $('#TMP1-pair').addClass('hidden')
      $('#UPCH-pair').addClass('hidden')
      $('#TMP0-button').addClass('hidden')
      $('#OP-button').addClass('hidden')
      $('#TMP1-button').addClass('hidden')
      $('#TMP2-button').addClass('hidden')
      $('#UPCH-button').addClass('hidden')
      $('#UPCL-button').addClass('hidden')

      $('#PCH-pair').prop('disabled', true)
      $('#PCH-button').prop('disabled', true)
      $('#PCL-button').prop('disabled', true)

      $('#controlUnit-grid').addClass('hidden')
      $('#C2D').addClass('hidden')
      $('#M2C').addClass('hidden')
    }
  }

  global.onMicrocodeChange = function () {
    var elements = document.getElementsByClassName('microcodeBlock')
    for (var i = 0; i < elements.length; i++) {
      elements.item(i).innerHTML = global.microcode[+elements.item(i).id.replace('microcode', '')]
    }
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
  }

  global.onMemoryChange = function () {

    // Scroll to changed element
    document.getElementById('scrollArea-memory').scrollTop =
      document.getElementById('contentArea-memory').
      getElementsByTagName('tr')[3].scrollHeight
      * ((global.addressBus.dec/8)-5)

    // Fill values to table
    var value
    var elements = document.getElementsByClassName('memoryBlock')
    for (var i = 0; i < elements.length; i++) {
      value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
      elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
    }

    // Highlight changed element
    setTimeout(function () { // Delay for clusterize to render object
      $('.highlighted').removeClass('highlighted')
      $('#memory' + global.addressBus.dec).addClass('highlighted')
    }, 50)
    setTimeout(function () {
      $('#memory' + global.addressBus.dec).removeClass('highlighted')
    }, 500)


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
    $('.mem-highlighted').removeClass('mem-highlighted')
    $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
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
      try {
        global.dataBus.val = tmp
      } catch (x) {
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



module.exports = gui
