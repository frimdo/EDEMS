var global = require('./globals.js')

var ALU = {}

ALU.doOperation = function () {
  if (typeof val === 'number') {
    switch(x){
      case 1:

    }
  } else {

  }
}

ALU.add = function () {
  global.dataBus.val = global.registerTMP0.dec + global.dataBus.dec
}

ALU.sub = function () {
  global.dataBus.val = global.registerTMP0.dec - global.dataBus.dec
}

ALU.neg = function () {
  global.dataBus.val = -global.dataBus.dec
}

ALU.not = function () {
  global.dataBus.val = ~global.dataBus.dec
}

ALU.and = function () {
  global.dataBus.val = global.dataBus.dec & global.registerTMP0.dec
}

ALU.orr = function () {
  global.dataBus.val = global.dataBus.dec | global.registerTMP0.dec
}

ALU.xor = function () {
  global.dataBus.val = global.dataBus.dec ^ global.registerTMP0.dec
}

ALU.rsh = function () {
  global.dataBus.val = global.dataBus.dec >>> 1
}

ALU.rro = function () {}

ALU.rrc = function () {}

ALU.asr = function () {
  // Nefunguje, není 8b číslo. global.dataBus.val = global.dataBus.dec >> 1
}

ALU.lsh = function () {
  global.dataBus.val = global.dataBus.dec << 1
}

ALU.lro = function () {}

ALU.lrc = function () {}

ALU.asl = function () {
  if ((global.dataBus.dec % 2) === 0) {
    global.dataBus.val = global.dataBus.dec << 1
  } else {
    global.dataBus.val = (global.dataBus.dec << 1) + 1
  }
}

ALU.equ = function () {
  global.dataBus.val = (global.dataBus.dec === 0) ? 1 : 0
}

ALU.bsr = function () {}

ALU.bsl = function () {}

ALU.oop = function () {}


module.exports = ALU