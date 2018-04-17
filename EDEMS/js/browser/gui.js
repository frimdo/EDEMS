var $ = require('jquery')
var global = require('../globals.js')
var Clusterize = require('clusterize.js')
var uCompiler = require('../microcodeCompiler.js')
var mCompiler = require('../memoryCompiler.js')
var ace = require('brace')
var LS = require('./localStorage.js')
require('brace/mode/assembly_x86')
require('../ace/EdemsMicrocodeAssembly')
require('../ace/EdemsMemoryAssembly')
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
  document.getElementById('freq').value = global.freq
}

gui.DrawMemoryTable = function () {

  gui.memoryData = []

  var newline = ''
  // Creating other rows
  for (i = 0; i < (global.memory.length); i += 8) {
    newline = '<th><div id=y-offset-memory' + i + ' class="memory-table-descr">' + i.toString(16) + '</div></th>'
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
      clusterChanged: function () {
        var value
        var elements = document.getElementsByClassName('memoryBlock')
        try {
          for (var i = 0; i < elements.length; i++) {
            value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
            elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
          }
          $('.mem-highlighted').removeClass('mem-highlighted')
          $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
        } catch (x) {
          window.localStorage.removeItem('memory')
          LS.initGlobals()
          for (var i = 0; i < elements.length; i++) {
            value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
            elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
          }
          $('.mem-highlighted').removeClass('mem-highlighted')
          $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
        }
      }
    }
  })

  gui.MemoryTable.refresh(gui.memoryData)
}

gui.DrawMemoryEditor = function () {
  global.memoryEditor = ace.edit('memory-editor')
  global.memoryEditor.setTheme('ace/theme/solarized_dark')
  global.memoryEditor.getSession().setMode({
    path: 'ace/mode/EdemsMemoryAssembly',
    v: Date.now()
  })
  global.memoryEditor.setValue(window.localStorage.getItem('memoryValue'))
}

gui.DrawMicrocodeEditor = function () {
  global.microcodeEditor = ace.edit('microcode-editor')
  global.microcodeEditor.getSession().setMode('ace/mode/EdemsMicrocodeAssembly')
  global.microcodeEditor.setTheme('ace/theme/solarized_dark')
  global.microcodeEditor.setValue(window.localStorage.getItem('microcodeValue'))
}

gui.DrawMicrocodeTable = function () {

  gui.microcodeData = []

  var newline = ''
  // Creating other rows
  for (i = 0; i < (global.microcode.length); i += 8) {
    newline = '<th><div id=y-offset-microcode' + i + ' class="microcode-table-descr">' + i.toString(16) + '</div></th>'
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

  document.getElementById('loadMemory').onchange = function (event) {
    var input = event.target
    try {
      var reader = new FileReader()
      reader.onload = function () {
        global.memoryEditor.setValue(reader.result)
      }
      reader.readAsText(input.files[0])
    } catch (x) {
      alert('Wrong file.')
    }
  }

  document.getElementById('loadMicrocode').onchange = function (event) {
    var input = event.target
    try {
      var reader = new FileReader()
      reader.onload = function () {
        global.microcodeEditor.setValue(reader.result)
      }
      reader.readAsText(input.files[0])
    } catch (x) {
      alert('Wrong file.')
    }
  }

  document.getElementById('saveMicrocode').onclick = function () {
    download('microcode.asm', global.microcodeEditor.getValue())
  }

  document.getElementById('saveMemory').onclick = function () {
    download('main.asm', global.memoryEditor.getValue())
  }

  document.getElementById('eraseMemory').onclick = function () {
    LS.storeGlobals()
    window.localStorage.removeItem('memory')
    LS.initGlobals()
    $('.highlighted').removeClass('highlighted')
    global.onMemoryChange()
  }

  document.getElementById('eraseMicrocode').onclick = function () {
    LS.storeGlobals()
    window.localStorage.removeItem('microcode')
    LS.initGlobals()
    $('.highlighted').removeClass('highlighted')
    global.onMicrocodeChange()
  }

  document.getElementById('compileMemory').onclick = function () {
    try {
      document.getElementById('rst-btn').onclick()

      var code = mCompiler.compile(global.memoryEditor.getValue())
      var orgs = Object.getOwnPropertyNames(code)

      for (var i = 0; i < orgs.length; i++) {
        Array.prototype.splice.apply(global.memory, [parseInt(orgs[i]), code[orgs[i]].length].concat(code[orgs[i]]))

        for (var y = parseInt(orgs[i]); y < parseInt(orgs[i]) + code[orgs[i]].length; y++) {
          highlight('#memory' + y)
        }
      }

      // Fill values to table
      var value
      var elements = document.getElementsByClassName('memoryBlock')
      for (var i = 0; i < elements.length; i++) {
        value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
        elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
      }

      document.getElementById('scrollArea-memory').scrollTop =
        document.getElementById('contentArea-memory').getElementsByTagName('tr')[3].scrollHeight
        * ((global.addressBus.dec / 8) - 5)

      global.instructionRegister.val = '0x' + global.memory[0]

      document.getElementById('scrollArea-microcode').scrollTop = 0

    } catch (Error) {
      alert(Error)
    }
  }

  document.getElementById('compileMicrocode').onclick = function () {
    try {
      $('.highlighted').removeClass('highlighted')

      var code = uCompiler.compile(global.microcodeEditor.getValue())
      Array.prototype.splice.apply(global.microcode, [0, code.length].concat(code))
      global.onMicrocodeChange()
      document.getElementById('scrollArea-microcode').scrollTop = 0
      for (var i = 0; i < code.length; i++) {
        highlight('#microcode' + i)
      }

      global.memoryEditor.getSession().setMode({
        path: 'ace/mode/EdemsMemoryAssembly',
        v: Date.now()
      })

    } catch (Error) {
      alert(Error)
    }
  }

  document.getElementById('decr').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      CU.uinstr.decb(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.decw(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('incr').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      CU.uinstr.incb(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.incw(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('M2C').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    CU.uinstr.end()
    return
  }

  document.getElementById('D2R').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      CU.uinstr.db2o()
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      CU.uinstr.db2r(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    return
  }

  document.getElementById('R2D').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      CU.uinstr.o2db()
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      CU.uinstr.r2db(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    return
  }

  document.getElementById('W2A').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      CU.uinstr.r2ab(global.register(document.getElementsByClassName('selectedRegister')[0].id.split('-')[0]))
      return
    }
    CU.uinstr.w2ab(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('A2W').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
      return
    }
    var array = []
    var elements = document.getElementsByClassName('selectedRegister')
    for (var i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    var pair = document.getElementsByClassName('selectedPair')[0]
    if (pair === undefined) {
      return
    }
    CU.uinstr.ab2w(global.register(pair.id.split('-')[0]))
    return
  }

  document.getElementById('svr').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    if (document.getElementsByClassName('OPSelected')[0] !== undefined) {
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
      if ($(this).hasClass('selectedRegister')) {
        $('#registers-grid').find('button').removeClass('selectedRegister').removeClass('selectedPair')
        $(this).addClass('OPSelected')
        return
      } else if ($(this).hasClass('OPSelected')) {
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

  document.getElementById('rst-btn').onclick = function () {
    clock.stop()
    global.addressBus.val = 0
    global.dataBus.val = 0
    global.instructionRegister.val = '0x' + global.memory[0]
    global.registerUPCH.valPair = global.instructionRegister.dec
    global.registerPCH.valPair = 0
    document.getElementById('scrollArea-microcode').scrollTop = 0

    $('.highlighted').removeClass('highlighted')
  }

  document.getElementById('step-btn').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    CU.beforeUintruction = function () {}
    clock.step()
  }

  document.getElementById('ustep-btn').onclick = function () {
    CU.beforeUintruction = function () { $('.highlighted').removeClass('highlighted')}
    clock.ustep()
  }

  document.getElementById('urun-btn').onclick = function () {
    CU.beforeUintruction = function () { $('.highlighted').removeClass('highlighted')}
    clock.urun()
  }

  document.getElementById('stop-btn').onclick = function () {
    clock.stop()
  }

  document.getElementById('WRT').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    CU.uinstr.wt()
  }

  document.getElementById('REA').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    CU.uinstr.rd()
  }

  document.getElementById('AL2').onclick = function () {
    $('.highlighted').removeClass('highlighted')
    alu.doOperation(document.getElementById('aluSelect').selectedIndex)
  }
}

gui.onChangeSetup = function () {
  document.getElementById('selectEdemsType').onchange = function () {
    global.advanced = this.value
    if (global.advanced == 'advanced') {
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
    } else if (global.advanced == 'basic') {
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
      document.getElementById('contentArea-memory').getElementsByTagName('tr')[3].scrollHeight
      * ((global.addressBus.dec / 8) - 5)

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
  }

  global.registerF.onChange = function () {
    var newValue = global.registerF.bin
    newValue = ('0'.repeat(8 - newValue.length) + newValue).split('')

    if ($('.F-viewer7').text() !== newValue[0]) {
      $('.F-viewer7').addClass('highlighted')
    }
    if ($('.F-viewer6').text() !== newValue[1]) {
      $('.F-viewer6').addClass('highlighted')
    }
    if ($('.F-viewer5').text() !== newValue[2]) {
      $('.F-viewer5').addClass('highlighted')
    }
    if ($('.F-viewer4').text() !== newValue[3]) {
      $('.F-viewer4').addClass('highlighted')
    }
    if ($('.F-viewer3').text() !== newValue[4]) {
      $('.F-viewer3').addClass('highlighted')
    }
    if ($('.F-viewer2').text() !== newValue[5]) {
      $('.F-viewer2').addClass('highlighted')
    }
    if ($('.F-viewer1').text() !== newValue[6]) {
      $('.F-viewer1').addClass('highlighted')
    }
    if ($('.F-viewer0').text() !== newValue[7]) {
      $('.F-viewer0').addClass('highlighted')
    }

    $('.F-viewer7').text(newValue[0])
    $('.F-viewer6').text(newValue[1])
    $('.F-viewer5').text(newValue[2])
    $('.F-viewer4').text(newValue[3])
    $('.F-viewer3').text(newValue[4])
    $('.F-viewer2').text(newValue[5])
    $('.F-viewer1').text(newValue[6])
    $('.F-viewer0').text(newValue[7])

    $('#registerF').text('0x' + global.registerF.hex).addClass('highlighted')
  }

  global.registerC.onChange = function () {
    $('#registerC').text('0x' + global.registerC.hex).addClass('highlighted')
  }

  global.registerB.onChange = function () {
    $('#registerB').text('0x' + global.registerB.hex).addClass('highlighted')
  }

  global.registerE.onChange = function () {
    $('#registerE').text('0x' + global.registerE.hex).addClass('highlighted')
  }

  global.registerD.onChange = function () {
    $('#registerD').text('0x' + global.registerD.hex).addClass('highlighted')
  }

  global.registerP.onChange = function () {
    $('#registerP').text('0x' + global.registerP.hex).addClass('highlighted')
  }

  global.registerS.onChange = function () {
    $('#registerS').text('0x' + global.registerS.hex).addClass('highlighted')
  }

  global.registerPCL.onChange = function () {
    $('#registerPCL').text('0x' + global.registerPCL.hex).addClass('highlighted')
  }

  global.registerPCH.onChange = function () {
    $('#registerPCH').text('0x' + global.registerPCH.hex).addClass('highlighted')
  }

  global.registerOP.onChange = function () {
    $('#registerOP').text('0x' + global.registerOP.hex).addClass('highlighted')
  }

  global.registerTMP0.onChange = function () {
    $('#registerTMP0').text('0x' + global.registerTMP0.hex).addClass('highlighted')
  }

  global.registerTMP2.onChange = function () {
    $('#registerTMP2').text('0x' + global.registerTMP2.hex).addClass('highlighted')
  }

  global.registerTMP1.onChange = function () {
    $('#registerTMP1').text('0x' + global.registerTMP1.hex).addClass('highlighted')
  }

  global.registerUPCL.onChange = function () {
    // Scroll to changed element
    document.getElementById('scrollArea-microcode').scrollTop =
      document.getElementById('contentArea-microcode').getElementsByTagName('tr')[3].scrollHeight
      * ((global.registerUPCH.decPair / 8) - 5)

    $('#registerUPCL').text('0x' + global.registerUPCL.hex).addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
  }

  global.registerUPCH.onChange = function () {
    // Scroll to changed element
    document.getElementById('scrollArea-microcode').scrollTop =
      document.getElementById('contentArea-microcode').getElementsByTagName('tr')[3].scrollHeight
      * ((global.registerUPCH.decPair / 8) - 5)

    $('#registerUPCH').text('0x' + global.registerUPCH.hex).addClass('highlighted')
    $('.umem-highlighted').removeClass('umem-highlighted')
    $('#microcode' + global.registerUPCH.decPair).addClass('umem-highlighted')
  }

  global.addressBus.onChange = function () {
    $('#addressBus').text('0x' + global.addressBus.hex).addClass('highlighted')
    $('.mem-highlighted').removeClass('mem-highlighted')
    $('#memory' + global.addressBus.dec).addClass('mem-highlighted')
  }

  global.dataBus.onChange = function () {
    $('#EdataBus').text('0x' + global.dataBus.hex).addClass('highlighted')
    document.getElementById('IdataBus').value = '0x' + global.dataBus.hex
    $('#IdataBus').addClass('highlighted')
  }

  document.getElementById('IdataBus').onchange = function () {
    var tmp = document.getElementById('IdataBus').value
    try {
      try {
        global.dataBus.val = +tmp
        return
      } catch (x) {
        global.dataBus.val = tmp
        return
      }
    } catch (x) {
      global.dataBus.val = global.dataBus.dec
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
  }
}

function download (filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

}

function highlight (what) {
  $(what).addClass('highlighted')
}

module.exports = gui
