var global = require('./globals.js')

var ALU = {}

ALU.doOperation = function (x) {
  switch (x) {
    case 1:
      ALU.add()
      break
    case 2:
      ALU.sub()
      break
    case 3:
      ALU.neg()
      break
    case 4:
      ALU.not()
      break
    case 5:
      ALU.and()
      break
    case 6:
      ALU.orr()
      break
    case 7:
      ALU.xor()
      break
    case 8:
      ALU.rsh()
      break
    case 9:
      ALU.lsh()
      break
    case 10:
      ALU.rro()
      break
    case 11:
      ALU.lro()
      break
    case 12:
      ALU.rrc()
      break
    case 13:
      ALU.lrc()
      break
    case 14:
      ALU.asr()
      break
    case 15:
      ALU.asl()
      break
    case 16:
      ALU.bsr()
      break
    case 17:
      ALU.bsl()
      break
    case 18:
      ALU.equ()
      break
    case 19:
      ALU.oop()
      break
    default:
      throw new RangeError('ALU.doOperation: Unknown ALU operation: ' + x)
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

ALU.rro = function () {
  var tmp = global.dataBus.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.charAt(7) + tmp.substring(0, 7)
}

ALU.rrc = function () {
  var tmp = global.dataBus.bin
  var F = global.registerF.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + F.charAt(F.length - 1) + tmp.substring(0, 7)
  global.registerF.val = '0b' + F.substring(0, F.length - 1) + tmp.charAt(7)
}

ALU.asr = function () {
  var tmp = global.dataBus.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.charAt(0) + tmp.substring(0, 7)
}

ALU.lsh = function () {
  global.dataBus.val = global.dataBus.dec << 1
}

ALU.lro = function () {
  var tmp = global.dataBus.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.substring(1, 8) + tmp.charAt(0)
}

ALU.lrc = function () {
  var tmp = global.dataBus.bin
  var F = global.registerF.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.substring(1, 8) + F.charAt(F.length - 1)
  global.registerF.val = '0b' + F.substring(0, F.length - 1) + tmp.charAt(0)
}

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

ALU.bsr = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.bsl = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.oop = function () {
  if (global.registerOP.dec === 19) {
    throw new RangeError('ALU.oop: Recursion caused by Register OP containing instruction to do operation defined by register OP.')
  }
  ALU.doOperation(global.registerOP.dec)
}
// TODO: ALU operace by měly ovlivňovat F registr
module.exports = ALU