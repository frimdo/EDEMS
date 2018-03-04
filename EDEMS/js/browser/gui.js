var $ = require('jquery')
var global = require('../globals.js')
var Clusterize = require('clusterize.js')

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
  var newline = '<tr><th><div class="table-descr">0x</div></th>'
  for (var i = 0; i < 8; i++) {
    newline = newline + '<th><div id=x-offset-memory' + i + ' class="table-descr">0' + i + '</div></th>'
  }
  gui.memoryData.push(newline + '</tr>')

  // Creating other rows
    for (i = 0; i < (global.memory.length); i += 8) {
    newline = '<th><div id=y-offset-memory' + i + ' class="table-descr">'+i.toString(16)+'</div></th>'
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
      }
    }
  })
  
  gui.MemoryTable.refresh(gui.memoryData)
}

gui.DrawMicrocodeTable = function () {

  gui.microcodeData = []

  // Creating x-offset row
  var newline = '<tr><th><div class="table-descr">0x</div></th>'
  for (var i = 0; i < 8; i++) {
    newline = newline + '<th><div id=x-offset-microcode' + i + ' class="table-descr">0' + i + '</div></th>'
  }
  gui.microcodeData.push(newline + '</tr>')

  // Creating other rows
  for (i = 0; i < (global.microcode.length); i += 8) {
    newline = '<th><div id=y-offset-microcode' + i + ' class="table-descr">'+i.toString(16)+'</div></th>'
    for (var y = 0; y < 8; y++) {
      newline = newline + '<th><div id=microcode' + (i + y) + ' class="microcodeBlock">...</div></th>'
    }
    gui.microcodeData.push(newline + '</tr>')
  }

  global.onMicrocodeChange = function () {
    var elements = document.getElementsByClassName('microcodeBlock')
    for (var i = 0; i < elements.length; i++) {
      elements.item(i).innerHTML = global.microcode[+elements.item(i).id.replace('microcode', '')]
    }
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
  }

  gui.MemoryTable = new Clusterize({
    rows: gui.microcodeData,
    scrollId: 'scrollArea-microcode',
    contentId: 'contentArea-microcode',
    rows_in_block: 8,
    callbacks: {
      clusterChanged: global.onMicrocodeChange
    }
  })

  gui.MemoryTable.refresh(gui.microcodeData)
}

gui.onclickSetup = function () {
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
    }
  }

  document.getElementById('D2R').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.join('-').split('-').includes('pair')) {
      return
    }
    if (array.includes('A-button')) {
      CU.uinstr.db2r('6')
      return
    }
    if (array.includes('F-button')) {
      CU.uinstr.db2r('7')
      return
    }
    if (array.includes('C-button')) {
      CU.uinstr.db2r('3')
      return
    }
    if (array.includes('B-button')) {
      CU.uinstr.db2r('0')
      return
    }
    if (array.includes('E-button')) {
      CU.uinstr.db2r('4')
      return
    }
    if (array.includes('D-button')) {
      CU.uinstr.db2r('1')
      return
    }
    if (array.includes('P-button')) {
      CU.uinstr.db2r('5')
      return
    }
    if (array.includes('S-button')) {
      CU.uinstr.db2r('2')
      return
    }
    if (array.includes('PCL-button')) {
      CU.uinstr.db2r('9')
      return
    }
    if (array.includes('PCH-button')) {
      CU.uinstr.db2r('8')
      return
    }
    if (array.includes('OP-button')) {
      CU.uinstr.db2r('D')
      return
    }
    if (array.includes('TMP0-button')) {
      CU.uinstr.db2r('A')
      return
    }
    if (array.includes('TMP2-button')) {
      CU.uinstr.db2r('E')
      return
    }
    if (array.includes('TMP1-button')) {
      CU.uinstr.db2r('B')
      return
    }
    if (array.includes('UPCL-button')) {
      CU.uinstr.db2r('F')
      return
    }
    if (array.includes('UPCH-button')) {
      CU.uinstr.db2r('C')
    }
  }

  document.getElementById('R2D').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.join('-').split('-').includes('pair')) {
      return
    }
    if (array.includes('A-button')) {
      CU.uinstr.r2db('6')
      return
    }
    if (array.includes('F-button')) {
      CU.uinstr.r2db('7')
      return
    }
    if (array.includes('C-button')) {
      CU.uinstr.r2db('3')
      return
    }
    if (array.includes('B-button')) {
      CU.uinstr.r2db('0')
      return
    }
    if (array.includes('E-button')) {
      CU.uinstr.r2db('4')
      return
    }
    if (array.includes('D-button')) {
      CU.uinstr.r2db('1')
      return
    }
    if (array.includes('P-button')) {
      CU.uinstr.r2db('5')
      return
    }
    if (array.includes('S-button')) {
      CU.uinstr.r2db('2')
      return
    }
    if (array.includes('PCL-button')) {
      CU.uinstr.r2db('9')
      return
    }
    if (array.includes('PCH-button')) {
      CU.uinstr.r2db('8')
      return
    }
    if (array.includes('OP-button')) {
      CU.uinstr.r2db('D')
      return
    }
    if (array.includes('TMP0-button')) {
      CU.uinstr.r2db('A')
      return
    }
    if (array.includes('TMP2-button')) {
      CU.uinstr.r2db('E')
      return
    }
    if (array.includes('TMP1-button')) {
      CU.uinstr.r2db('B')
      return
    }
    if (array.includes('UPCL-button')) {
      CU.uinstr.r2db('F')
      return
    }
    if (array.includes('UPCH-button')) {
      CU.uinstr.r2db('C')
    }
  }

  document.getElementById('W2A').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.includes('F-pair')) {
      CU.uinstr.ab2w('7')
      return
    }
    if (array.includes('B-pair')) {
      CU.uinstr.ab2w('0')
      return
    }
    if (array.includes('D-pair')) {
      CU.uinstr.ab2w('1')
      return
    }
    if (array.includes('S-pair')) {
      CU.uinstr.ab2w('2')
      return
    }
    if (array.includes('PCH-pair')) {
      CU.uinstr.ab2w('8')
      return
    }
    if (array.includes('TMP0-pair')) {
      CU.uinstr.ab2w('A')
      return
    }
    if (array.includes('TMP1-pair')) {
      CU.uinstr.ab2w('B')
      return
    }
    if (array.includes('UPCH-pair')) {
      CU.uinstr.ab2w('C')
    }
  }

  document.getElementById('A2W').onclick = function () {
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    if (array.includes('F-pair')) {
      CU.uinstr.w2ab('7')
      return
    }
    if (array.includes('B-pair')) {
      CU.uinstr.w2ab('0')
      return
    }
    if (array.includes('D-pair')) {
      CU.uinstr.w2ab('1')
      return
    }
    if (array.includes('S-pair')) {
      CU.uinstr.w2ab('2')
      return
    }
    if (array.includes('PCH-pair')) {
      CU.uinstr.w2ab('8')
      return
    }
    if (array.includes('TMP0-pair')) {
      CU.uinstr.w2ab('A')
      return
    }
    if (array.includes('TMP1-pair')) {
      CU.uinstr.w2ab('B')
      return
    }
    if (array.includes('UPCH-pair')) {
      CU.uinstr.w2ab('C')
      return
    }
    if (array.includes('A-button')) {
      CU.uinstr.r2ab('6')
      return
    }
    if (array.includes('F-button')) {
      CU.uinstr.r2ab('7')
      return
    }
    if (array.includes('C-button')) {
      CU.uinstr.r2ab('3')
      return
    }
    if (array.includes('B-button')) {
      CU.uinstr.r2ab('0')
      return
    }
    if (array.includes('E-button')) {
      CU.uinstr.r2ab('4')
      return
    }
    if (array.includes('D-button')) {
      CU.uinstr.r2ab('1')
      return
    }
    if (array.includes('P-button')) {
      CU.uinstr.r2ab('5')
      return
    }
    if (array.includes('S-button')) {
      CU.uinstr.r2ab('2')
      return
    }
    if (array.includes('PCL-button')) {
      CU.uinstr.r2ab('9')
      return
    }
    if (array.includes('PCH-button')) {
      CU.uinstr.r2ab('8')
      return
    }
    if (array.includes('OP-button')) {
      CU.uinstr.r2ab('D')
      return
    }
    if (array.includes('TMP0-button')) {
      CU.uinstr.r2ab('A')
      return
    }
    if (array.includes('TMP2-button')) {
      CU.uinstr.r2ab('E')
      return
    }
    if (array.includes('TMP1-button')) {
      CU.uinstr.r2ab('B')
      return
    }
    if (array.includes('UPCL-button')) {
      CU.uinstr.r2ab('F')
      return
    }
    if (array.includes('UPCH-button')) {
      CU.uinstr.r2ab('C')
    }
  }

  document.getElementById('svr').onclick = function () {
    if (document.getElementsByClassName('selectedRegister')[0] === undefined &&
      document.getElementsByClassName('selectedPair')[0] === undefined) {
      return
    }
    var svr = $('#svr')
    if (svr.hasClass('svrSelected')) {
      svr.removeClass('svrSelected')
    } else {
      svr.addClass('svrSelected')
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
  document.getElementById('OP-button').onclick =
  document.getElementById('TMP1-button').onclick =
  document.getElementById('TMP2-button').onclick =
  document.getElementById('UPCH-button').onclick =
  document.getElementById('UPCL-button').onclick = function () {
    if (!$('#svr').hasClass('svrSelected')) { // SVR button not pressed
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
      $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
      console.log('pair')
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

  document.getElementById('advanced').onclick = function () {
    global.advanced = !global.advanced
    if(global.advanced){
      $('#body-grid').addClass('advanced')
      $('#controlUnit-grid').removeClass('hidden')
      $('#C2D').removeClass('hidden')
      $('#M2C').removeClass('hidden')
    } else {
      $('#body-grid').removeClass('advanced')
      $('#controlUnit-grid').addClass('hidden')
      $('#C2D').addClass('hidden')
      $('#M2C').addClass('hidden')
    }
  }
  global.advanced = true
  document.getElementById('advanced').onclick()
}

gui.onChangeSetup = function () {
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
      $('.mem-highlighted').removeClass('mem-highlighted')
      $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
    }, 50)
    setTimeout(function () {
      $('#memory' + global.addressBus.dec).removeClass('mem-highlighted')
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



module.exports = gui
