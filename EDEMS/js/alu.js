var global = require('./globals.js')

var ALU = {}

ALU.doOperation = function (x) {
  switch (x) {
    case 0:
      ALU.add()
      break
    case 1:
      ALU.sub()
      break
    case 2:
      ALU.neg()
      break
    case 3:
      ALU.not()
      break
    case 4:
      ALU.and()
      break
    case 5:
      ALU.orr()
      break
    case 6:
      ALU.xor()
      break
    case 7:
      ALU.shr()
      break
    case 8:
      ALU.shl()
      break
    case 9:
      ALU.ror()
      break
    case 10:
      ALU.rol()
      break
    case 11:
      ALU.rcr()
      break
    case 12:
      ALU.rcl()
      break
    case 13:
      ALU.asr()
      break
    case 14:
      ALU.asl()
      break
    case 15:
      ALU.bsr()
      break
    case 16:
      ALU.bsl()
      break
    case 17:
      ALU.equ()
      break
    case 18:
      ALU.oop()
      break
    default:
      throw new RangeError('ALU.doOperation: Unknown ALU operation: ' + x)
  }
  if (global.dataBus.dec === 0){
    global.registerF.setBit(1)
  } else {
    global.registerF.resBit(1)
  }
  if (global.dataBus.dec > 127){
    global.registerF.setBit(2)
  }
  else {
    global.registerF.resBit(2)
  }
}

ALU.add = function () {
  global.dataBus.val = global.registerTMP0.dec + global.dataBus.dec
}

ALU.sub = function () {
  global.dataBus.val = global.dataBus.dec - global.registerTMP0.dec
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

ALU.shr = function () {
  global.dataBus.val = global.dataBus.dec >>> 1
}

ALU.ror = function () {
  var tmp = global.dataBus.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.charAt(7) + tmp.substring(0, 7)
}

ALU.rcr = function () {
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

ALU.shl = function () {
  global.dataBus.val = global.dataBus.dec << 1
}

ALU.rol = function () {
  var tmp = global.dataBus.bin
  tmp = '0'.repeat(8 - tmp.length) + tmp
  global.dataBus.val = '0b' + tmp.substring(1, 8) + tmp.charAt(0)
}

ALU.rcl = function () {
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