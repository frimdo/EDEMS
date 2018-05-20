var global = require('./globals.js')

var ALU = {}

/** Function to execute ALU operation
 * @param {number} index of operation
 */
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
  countZero(global.dataBus.dec)
  countNegative(global.dataBus.dec)
  countParity(global.dataBus.dec)
}

/** Function for finding carry
 * @param {number} untruncated result of operation
 */
function countCarry (input) {
  if (((input >> 8) & 1) === 1) {
    global.registerF.setBit(0)
  } else {
    global.registerF.resBit(0)
  }
}

/** Function for finding if result is zero
 * @param {number} result of operation
 */
function countZero (input) {
  if (input === 0) {
    global.registerF.setBit(1)
  } else {
    global.registerF.resBit(1)
  }
}

/** Function for finding if result is negative
 * @param {number} result of operation
 */
function countNegative (input) {
  if (input > 127) {
    global.registerF.setBit(2)
  } else {
    global.registerF.resBit(2)
  }
}

/** Function for finding if overflow occured. This has two rules:
 * If the sum of two positive numbers yields a negative result, the sum has overflowed.
 * If the sum of two negative numbers yields a positive result, the sum has overflowed.
 * @param {number} operand1 of operation
 * @param {number} operand2 of operation
 * @param {number} result of operation
 */
function countOverflow (operand1, operand2, result) {
  if (operand1 > 127 && operand2 > 127 && result <= 127) {
    global.registerF.setBit(3)
  } else if (operand1 <= 127 && operand2 <= 127 && result > 127) {
    global.registerF.setBit(3)
  } else {
    global.registerF.resBit(3)
  }
}

/** Function for finding if parity is odd.
 * parity odd = 1, even = 0
 * @param {number} result of operation
 */
function countParity (input) {
  input = input.toString(2)
  if (input.match(/1/g) === null) {
    global.registerF.resBit(4)
  } else if (input.match(/1/g).length % 2) {
    global.registerF.resBit(4)
  } else {
    global.registerF.setBit(4)
  }
}

/** Function for finding if half carry occured.
 * Half carry occures if fourth bit of number changes
 * parity odd = 1, even = 0
 * @param {number} operand of operation
 * @param {number} result of operation
 */
function countHalfCarry (before, after) {
  if (((before >> 4) & 1) === ((after >> 4) & 1)) {
    global.registerF.resBit(5)
  } else {
    global.registerF.setBit(5)
  }
}

ALU.add = function () {
  var result = global.registerTMP0.dec + global.dataBus.dec
  countOverflow(global.registerTMP0.dec, global.dataBus.dec, result & 255)
  countHalfCarry(global.dataBus.dec, result)
  global.dataBus.val = result
  countCarry(result)
}

ALU.sub = function () {
  var result = global.dataBus.dec - global.registerTMP0.dec
  countOverflow(global.registerTMP0.dec, -global.dataBus.dec, result & 255)
  countHalfCarry(global.dataBus.dec, result)
  global.dataBus.val = result
  countCarry(result)
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
  var DBL = global.dataBus.dec & 15

  global.dataBus.val = (global.dataBus.dec & 240) | (global.registerTMP0.dec & 15)

  global.registerTMP0.val = (global.registerTMP0.dec >> 4) | (DBL << 4)
}

ALU.bsl = function () {
  var DBL = global.dataBus.dec & 15

  global.dataBus.val = (global.dataBus.dec & 240) | (global.registerTMP0.dec >> 4)

  global.registerTMP0.val = (global.registerTMP0.dec << 4) | DBL
}

ALU.oop = function () {
  if (global.registerOP.dec === 19) {
    throw new RangeError('ALU.oop: Recursion caused by Register OP containing instruction to do operation defined by register OP.')
  }
  ALU.doOperation(global.registerOP.dec)
}
module.exports = ALU
