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

  global.onMemoryChange = function () {
    var value
    var elements = document.getElementsByClassName('memoryBlock')
    for (var i = 0; i < elements.length; i++) {
      value = global.memory[+elements.item(i).id.replace('memory', '')].toString(16)
      elements.item(i).innerHTML = '0'.repeat(2 - value.length) + value
    }
  }

  gui.MemoryTable = new Clusterize({
    rows: gui.memoryData,
    scrollId: 'scrollArea-memory',
    contentId: 'contentArea-memory',
    rows_in_block: 8,
    callbacks: {
      clusterChanged: global.onMemoryChange
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
    global.registerUPCH.onChange()
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

module.exports = gui
